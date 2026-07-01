function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">About</h1>
        <p className="text-purple-300 text-lg max-w-md">
          This app demonstrates client-side routing using react-router-dom v6.
        </p>
      </div>
    </div>
  )
}

export default About