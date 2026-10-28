import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import './blog.css'

const posts = [
  ['What is IBD (Inflammatory Bowel Disease): Symptoms, IBD vs IBS, Treatment and Diet', 'Gut Health', 'An evidence-based guide to IBD symptoms, treatment, and the role of nutrition.', 'what-is-ibd-ibd-vs-ibs', '1b432c_e50fc5ab7a554a1ba7fcdcf3ab1fbb1f~mv2.png'],
  ["Runner's Stomach and Runner's Diarrhea: Why It Happens, How Long It Lasts and How to Stop It", 'Sports Nutrition', 'Understand digestive symptoms during running and practical ways to manage them.', 'runners-stomach', '11062b_daca98a9e870490986859c1fc81e7113~mv2.jpg'],
  ['Low Stomach Acid: Symptoms, Causes & Tests (Hypochlorhydria)', 'Gut Health', 'Explore the symptoms, possible causes, and tests for low stomach acid.', 'low-stomach-acid-symptoms', '1b432c_fa17f77997f842959e34001d0a3c246c~mv2.jpg'],
  ['Saffron for ADHD: What the Research Says About Benefits, Dosage, Safety and Side Effects', 'Nutrition Supplements', 'A closer look at the research, safety, and limitations of saffron for ADHD.', 'saffron-for-adhd', 'nsplsh_ef501be81c204cf8a9d316e933dd1441~mv2.jpg'],
  ['L-theanine Supplement: Benefits, Side Effects, Dosage and What the Science Says', 'Gut Health', 'What the evidence says about L-theanine, stress, sleep, and the gut-brain connection.', 'l-theanine-supplement', '11062b_e71a11805feb4efd8ce82913d98e167b~mv2.jpg'],
  ["Genetic Methylation Test: What an MTHFR Result Can (and Can't) Tell You About ADHD, Mood and Focus", 'Gut Health', 'Understand what genetic methylation tests can and cannot tell you.', 'genetic-methylation-test', 'd7cd16_e9684e26ba9f4b11a8ef305b3ffa1833~mv2.jpg'],
  ['GLP-1 Side Effects: How They Affect Digestion, Gastric Emptying and Gut Motility', 'Gut Health', 'How GLP-1 medications affect digestion and what to know about common symptoms.', 'glp-1-side-effects', '4d180cd9aa2b40a5969735637ce00ab3.jpg'],
  ['What Is the Vagus Nerve? Gut Link, Reset Myths & Evidence', 'Gut Health', 'A practical look at the vagus nerve, its gut connection, and the evidence behind popular claims.', 'vagus-nerve', '1b432c_b1f9d91cd0f44ed4a4e43b02aefacb44~mv2.png'],
  ['MCAS (Mast Cell Activation Syndrome): Symptoms, the Gut Connection and What to Eat', 'Gut Health', 'Learn about MCAS symptoms, the gut connection, and nutrition support.', 'mcas', '11062b_694b1e153d59443aa0bbc0742b7db759~mv2.jpeg'],
  ['Best Sports Nutritionist in Chennai: What to Actually Look For (and Why It Matters)', 'Sports Nutrition', 'What to look for when choosing nutrition support for an athlete.', 'best-sports-nutritionist-in-chennai', 'd9db73_6e3e23c381054debb382e24eb7149a29~mv2.jpg'],
  ["Digestive Enzymes, Low Stomach Acid, and SIBO: What's Actually Going Wrong When Digestion Fails", 'Gut Health', 'Explore the roles of stomach acid and enzymes in digestion and digestive symptoms.', 'digestive-enzymes', '11062b_06d5d2444a63452ab2809157423f2b3e~mv2.jpeg'],
  ["How to Grow Taller: A Nutritionist's Honest Answer for Parents", 'Child Nutrition', 'A guide to nutrition, sleep and growth for children and teens.', 'how-to-grow-taller', '1b432c_2c4d1f1c5f9d4c68ab480f282124b8f8~mv2.png']
]

export default function BlogPage() {
  useSeo('Blog', 'Evidence-based articles on gut health, sports nutrition and clinical dietetics.')
  return <>
    <PageHero title="Blog" blurb="Articles on gut health, sports nutrition and clinical dietetics." />
    <Section width="wide" bg="base" title="Explore the latest articles" lead="Evidence-based nutrition insights from Meenu Balaji.">
      <div className="blog-grid">{posts.map(([title, category, summary, slug, image]) => (
        <article className="blog-card" key={slug}>
          <a
            className="blog-card-image"
            href={`https://www.pragmaticnutritionist.com/post/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img src={`https://static.wixstatic.com/media/${image}`} alt={title} loading="lazy" />
          </a>
          <div className="blog-card-body">
            <span className="blog-card-category">{category}</span>
            <h2>
              <a
                href={`https://www.pragmaticnutritionist.com/post/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            </h2>
            <p>{summary}</p>
            <span className="blog-card-author">Meenu Balaji, M.H.Sc</span>
            <a
              className="blog-card-link"
              href={`https://www.pragmaticnutritionist.com/post/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read article <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </article>
      ))}</div>
    </Section>
  </>
}
