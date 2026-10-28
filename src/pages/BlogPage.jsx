import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import blogExcerpts from '../data/blogExcerpts.json'
import './blog.css'

const posts = [
  ['High Fibre Foods for Piles', 'Gut Health', '', 'high-fibre-foods-for-piles', '1b432c_f4795157c0464eb68b62551fd687df30~mv2.png'],
  ['Psyllium Husk (Isabgol): Benefits, How to Take It, Side Effects and Who Should Avoid It', 'Gut Health', '', 'psyllium-husk-benefits-side-effects', '1b432c_c34803d159064addb30b9bfbf03c3200~mv2.jpg'],
  ['What is IBD (Inflammatory Bowel Disease): Symptoms, IBD vs IBS, Treatment and Diet', 'Gut Health', 'Explore IBD symptoms, how IBD differs from IBS, treatment, and the role of food and lifestyle alongside medical care.', 'what-is-ibd-ibd-vs-ibs', '1b432c_e50fc5ab7a554a1ba7fcdcf3ab1fbb1f~mv2.png'],
  ["Runner's Stomach and Runner's Diarrhea: Why It Happens, How Long It Lasts and How to Stop It", 'Sports Nutrition', 'Learn why running can cause digestive symptoms, how food and training may affect them, and when to seek medical advice.', 'runners-stomach', '11062b_daca98a9e870490986859c1fc81e7113~mv2.jpg'],
  ['Low Stomach Acid: Symptoms, Causes & Tests (Hypochlorhydria)', 'Gut Health', 'Explore possible symptoms and causes of low stomach acid, medical tests, common remedies, and when to see a doctor.', 'low-stomach-acid-symptoms', '1b432c_fa17f77997f842959e34001d0a3c246c~mv2.jpg'],
  ['Saffron for ADHD: What the Research Says About Benefits, Dosage, Safety and Side Effects', 'Nutrition Supplements', 'A look at the limited research on saffron for ADHD, including supplement choices, potential side effects, and safety considerations.', 'saffron-for-adhd', 'nsplsh_ef501be81c204cf8a9d316e933dd1441~mv2.jpg'],
  ['L-theanine Supplement: Benefits, Side Effects, Dosage and What the Science Says', 'Gut Health', 'Explore the evidence on L-theanine, stress, sleep and ADHD, as well as dosage, side effects and who should avoid it.', 'l-theanine-supplement', '11062b_e71a11805feb4efd8ce82913d98e167b~mv2.jpg'],
  ["Genetic Methylation Test: What an MTHFR Result Can (and Can't) Tell You About ADHD, Mood and Focus", 'Gut Health', 'Understand the limits of MTHFR and COMT testing, the research on ADHD and nutrients, and when blood tests may be more useful.', 'genetic-methylation-test', 'd7cd16_e9684e26ba9f4b11a8ef305b3ffa1833~mv2.jpg'],
  ['GLP-1 Side Effects: How They Affect Digestion, Gastric Emptying and Gut Motility', 'Gut Health', 'Learn how GLP-1 medicines can affect digestion, which symptoms need attention, and what the guide says about food and stopping treatment.', 'glp-1-side-effects', '4d180cd9aa2b40a5969735637ce00ab3.jpg'],
  ['What Is the Vagus Nerve? Gut Link, Reset Myths & Evidence', 'Gut Health', 'A practical look at what the vagus nerve does, its connection to the gut, and the evidence behind popular reset claims.', 'vagus-nerve', '1b432c_b1f9d91cd0f44ed4a4e43b02aefacb44~mv2.png'],
  ['MCAS (Mast Cell Activation Syndrome): Symptoms, the Gut Connection and What to Eat', 'Gut Health', 'Understand MCAS symptoms, how it differs from histamine intolerance and IBS, and the role food may play alongside treatment.', 'mcas', '11062b_694b1e153d59443aa0bbc0742b7db759~mv2.jpeg'],
  ['Best Sports Nutritionist in Chennai: What to Actually Look For (and Why It Matters)', 'Sports Nutrition', 'Find out what to consider when choosing nutrition support for a teen athlete, including experience, qualifications and results.', 'best-sports-nutritionist-in-chennai', 'd9db73_6e3e23c381054debb382e24eb7149a29~mv2.jpg']
]

export default function BlogPage() {
  useSeo('Blog', 'Evidence-based articles on gut health, sports nutrition and clinical dietetics.')
  return <>
    <PageHero title="Blog" blurb="Evidence-based guides on gut health and teen athlete nutrition, written by Meenu Balaji, M.H.Sc." />
    <Section width="wide" bg="base" title="Explore the latest articles" lead="Evidence-based nutrition insights from Meenu Balaji.">
      <div className="blog-grid">{posts.map(([title, category, , slug, image], index) => (
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
            <p>{blogExcerpts.excerpts[index]}</p>
            <span className="blog-card-author">Meenu Balaji, M.H.Sc (Food Sc &amp; Nutrition) | Peer Reviewer for European Journal of Nutrition</span>
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
