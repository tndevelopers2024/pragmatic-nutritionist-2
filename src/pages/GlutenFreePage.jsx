import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import './academy.css'

export default function GlutenFreePage() {
  useSeo('How to Start a Gluten-Free Diet', 'What to eat and What to avoid in a Gluten-free diet')
  return <div className="academy-page">
    <PageHero title="How to Start a Gluten- Free Diet?" />
    <Section bg="white" width="wide"><img src="/images/gluten-free-guide.avif" alt="Gluten free guide, gluten free life, gluten free foods, how to start a gluten free diet" style={{ width: '100%', borderRadius: 16, display: 'block' }} /></Section>
    <Section bg="white" title="Download your Free Copy" width="wide">
      <div className="academy-copy"><p><Link to="/post/gluten-free-foods">What to eat and What to avoid in a Gluten-free diet</Link></p></div>
    </Section>
    <Section bg="base" title="Discover the Freedom of a Gluten-Free Diet" width="wide">
      <div className="academy-copy">
        <p>Welcome to our guide on embracing a gluten-free lifestyle! Whether you're here out of curiosity or necessity, going gluten-free can be a game-changer for your health and well-being.</p>
        <h3>What is Gluten, Anyway?</h3>
        <p>Let's break it down: gluten is a protein found in wheat, barley, rye, and their derivatives. For some folks, consuming gluten can lead to discomfort or serious health issues. That's where a gluten-free diet swoops in to save the day.</p>
        <h3>Who Benefits from Going Gluten-Free?</h3>
        <p>People with celiac disease are at the top of the list. This autoimmune condition causes the body to react negatively to gluten, damaging the small intestine and leading to a host of issues. Then there are those with gluten sensitivity or intolerance who may experience bloating, headaches, or fatigue when gluten comes into play.</p>
        <h3>What Can You Eat on a Gluten-Free Diet?</h3>
        <p>Surprisingly, there's a ton of delicious options! Think naturally gluten-free goodies like fruits, veggies, lean proteins, and dairy products. Plus, many grains like quinoa, rice, and corn are gluten-free too. Nowadays, finding gluten-free alternatives in supermarkets or even at your favorite restaurant is easier than ever.</p>
        <h3>Why Go Gluten-Free?</h3>
        <p>Aside from the obvious health benefits, some folks swear by increased energy levels, improved digestion, and even better skin! Plus, with the rise of gluten-free awareness, more and more delicious options are hitting the shelves.</p>
      </div>
    </Section>
  </div>
}
