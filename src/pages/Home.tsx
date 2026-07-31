import Hero from '../components/Hero'
import BandaDiscrecion from '../components/BandaDiscrecion'
import SeccionLenceria from '../components/SeccionLenceria'
import SeccionJuegos from '../components/SeccionJuegos'
import SeccionNosotros from '../components/SeccionNosotros'
import SeccionTallas from '../components/SeccionTallas'
import SeccionCierre from '../components/SeccionCierre'

export default function Home() {
  return (
    <>
      <Hero />
      <BandaDiscrecion />
      <SeccionLenceria />
      <SeccionJuegos />
      {/* TODO: faltan testimonios reales de clientas */}
      <SeccionNosotros />
      <SeccionTallas />
      <SeccionCierre />
    </>
  )
}
