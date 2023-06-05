import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
      </h1>
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        AI-Powered Prompts
      </span>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laboriosam officiis, explicabo non tempora tempore provident asperiores magnam ipsum minima aut veniam quos quam magni labore excepturi animi quasi ipsa!
      </p>
      <Feed /> 
    </section >
  )
}

export default Home