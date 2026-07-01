function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">Welcome Home</h1>
        <p className="text-purple-300 text-lg max-w-md">
          This is the home page. Use the navbar to navigate between pages.
        </p>
      </div>
    </div>
  )
}

export default Home