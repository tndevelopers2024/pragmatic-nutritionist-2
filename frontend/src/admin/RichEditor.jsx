import { useId, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { TableKit } from '@tiptap/extension-table'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  ImagePlus,
  Quote,
  Undo2,
  Redo2,
  Table,
  Minus
} from 'lucide-react'
import { uploadImage } from './api'
import { imageUploadMessage } from '@pragmatic/shared/image-policy'

export default function RichEditor({ content, onChange, onError, onUploadStateChange }) {
  const inputId = useId()
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [linkForm, setLinkForm] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false } }),
      Image,
      TableKit
    ],
    content,
    editorProps: {
      attributes: {
        class: 'cms-prose',
        'aria-label': 'Article content',
        role: 'textbox',
        'aria-multiline': 'true'
      }
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    shouldRerenderOnTransaction: true
  })
  if (!editor) return <p>Loading editor…</p>
  const tools = [
    [Bold, 'Bold', 'bold', () => editor.chain().focus().toggleBold().run()],
    [Italic, 'Italic', 'italic', () => editor.chain().focus().toggleItalic().run()],
    [List, 'Bullet list', 'bulletList', () => editor.chain().focus().toggleBulletList().run()],
    [
      ListOrdered,
      'Numbered list',
      'orderedList',
      () => editor.chain().focus().toggleOrderedList().run()
    ],
    [Quote, 'Quote', 'blockquote', () => editor.chain().focus().toggleBlockquote().run()],
    [
      Link,
      'Add link',
      'link',
      () => {
        setLinkUrl(editor.getAttributes('link').href || 'https://')
        setLinkForm(true)
      }
    ],
    [
      ImagePlus,
      uploading ? 'Optimizing & uploading image…' : 'Insert image',
      'image',
      () => document.getElementById(inputId)?.click()
    ],
    [
      Table,
      'Insert table',
      'table',
      () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    ],
    [Minus, 'Divider', '', () => editor.chain().focus().setHorizontalRule().run()],
    [Undo2, 'Undo', '', () => editor.chain().focus().undo().run()],
    [Redo2, 'Redo', '', () => editor.chain().focus().redo().run()]
  ]
  async function insertImage(event) {
    const file = event.target.files[0]
    if (!file) return
    setUploading(true)
    setUploadMessage('Optimizing & uploading image…')
    onUploadStateChange?.(true)
    try {
      const image = await uploadImage(file)
      editor
        .chain()
        .focus()
        .setImage({ src: image.url, alt: image.alt || file.name.replace(/\.[^.]+$/, '') })
        .run()
      setUploadMessage(imageUploadMessage(image))
    } catch (error) {
      onError(error.message)
      setUploadMessage('')
    } finally {
      setUploading(false)
      onUploadStateChange?.(false)
      event.target.value = ''
    }
  }
  return (
    <div className="cms-rich-editor">
      {uploadMessage && (
        <p className="cms-editor-upload-status cms-muted" role="status">
          {uploadMessage}
        </p>
      )}
      <div className="cms-editor-toolbar" role="toolbar" aria-label="Text formatting">
        <select
          aria-label="Text style"
          value={
            editor.isActive('heading', { level: 2 })
              ? 'h2'
              : editor.isActive('heading', { level: 3 })
                ? 'h3'
                : editor.isActive('heading', { level: 4 })
                  ? 'h4'
                  : 'p'
          }
          onChange={(e) =>
            e.target.value === 'p'
              ? editor.chain().focus().setParagraph().run()
              : editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: Number(e.target.value.slice(1)) })
                  .run()
          }
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>
        {tools.map(([Icon, label, active, action]) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active ? editor.isActive(active) : undefined}
            disabled={uploading && active === 'image'}
            onClick={action}
          >
            <Icon size={17} />
          </button>
        ))}
        <input
          type="file"
          id={inputId}
          hidden
          accept="image/jpeg,image/png,image/webp"
          onChange={insertImage}
        />
      </div>
      {linkForm && (
        <div className="cms-link-form">
          <label>
            Link URL
            <input
              aria-label="Link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              if (!/^(https?:\/\/|mailto:|tel:|\/[^/]|#)/i.test(linkUrl)) {
                onError('Enter a valid link, starting with https:// or /.')
                return
              }
              editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
              setLinkForm(false)
            }}
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().unsetLink().run()
              setLinkForm(false)
            }}
          >
            Remove link
          </button>
          <button type="button" onClick={() => setLinkForm(false)}>
            Cancel
          </button>
        </div>
      )}
      {editor.isActive('table') && (
        <div className="cms-table-tools">
          {[
            ['Add row', () => editor.chain().focus().addRowAfter().run()],
            ['Add column', () => editor.chain().focus().addColumnAfter().run()],
            ['Delete row', () => editor.chain().focus().deleteRow().run()],
            ['Delete column', () => editor.chain().focus().deleteColumn().run()],
            ['Remove table', () => editor.chain().focus().deleteTable().run()]
          ].map(([label, action]) => (
            <button type="button" key={label} onClick={action}>
              {label}
            </button>
          ))}
        </div>
      )}
      <EditorContent editor={editor} />
      <div className="cms-editor-foot">
        Write naturally. Paste from Word or Google Docs. Use headings to build the article’s
        contents automatically.
      </div>
    </div>
  )
}
