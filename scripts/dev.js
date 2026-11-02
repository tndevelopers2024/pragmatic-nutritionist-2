import { spawn } from 'node:child_process'

const children = []
let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  process.exitCode = code
  for (const child of children) {
    try {
      if (process.platform === 'win32') child.kill('SIGTERM')
      else process.kill(-child.pid, 'SIGTERM')
    } catch (error) {
      if (error.code !== 'ESRCH') throw error
    }
  }
}
for (const workspace of ['backend', 'frontend']) {
  const args = ['run', 'dev', '--workspace', workspace]
  if (workspace === 'frontend') args.push('--', ...process.argv.slice(2))
  const options = { stdio: 'inherit', detached: process.platform !== 'win32' }
  const child = process.env.npm_execpath
    ? spawn(process.execPath, [process.env.npm_execpath, ...args], options)
    : spawn('npm', args, options)
  children.push(child)
  child.on('error', () => stop(1))
  child.on('exit', code => stop(code || 0))
}
process.once('SIGINT', () => stop())
process.once('SIGTERM', () => stop())
