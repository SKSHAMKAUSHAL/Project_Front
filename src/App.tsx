import { useState } from 'react'
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'
import { Button } from './components/ui/button'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navigation - Clean & Minimal */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-100">
        <div className="container mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
             <div className="h-8 w-8 bg-black rounded flex items-center justify-center text-white font-bold text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
             </div>
             <span className="font-extrabold text-xl tracking-tight text-slate-900 uppercase">CA MONK</span>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
             <a href="#" className="hover:text-slate-900 transition-colors">Tools</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Practice</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Events</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Job Board</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Points</a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-4">
             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 h-9 rounded-md shadow-none hover:shadow-indigo-200 hover:shadow-lg transition-all">
                Profile
             </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white py-12 md:py-16 text-center border-b border-slate-100">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">CA Monk Blog</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium px-4">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
      </div>


      {/* Main Layout - Split View with Focused Design */}
      <main className="container mx-auto py-8 px-4 md:px-6 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Blog List (Sidebar) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6 sticky top-24">
            {/* Sidebar Header */}
            <div className="pb-4 z-10 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                    <h2 className="font-bold text-lg text-slate-900">Latest Articles</h2>
                </div>
                <CreateBlogForm />
            </div>
            
            {/* Scrollable List */}
            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-1 space-y-3 no-scrollbar">
               <BlogList 
                 selectedBlogId={selectedBlogId} 
                 onSelectBlog={setSelectedBlogId} 
               />
            </div>
          </div>


          {/* Right Panel: Content (Main Stage) */}
          <div className="hidden md:flex md:col-span-8 lg:col-span-9 flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[800px]">
            {/* Decorative background element */}
            <div className="w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="flex-1">
               <BlogDetail blogId={selectedBlogId} />
            </div>
          </div>


        </div>
      </main>

       {/* Footer */}
       <footer className="bg-slate-950 text-slate-300 py-16 mt-0 border-t border-slate-900">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                   <div className="flex items-center gap-2 mb-6 cursor-pointer">
                      <div className="h-6 w-6 bg-white rounded flex items-center justify-center text-black font-bold text-xs">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      <span className="font-extrabold text-lg tracking-tight text-white uppercase">CA MONK</span>
                   </div>
                   <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      Empowering the next generation of financial leaders with tools, community, and knowledge.
                   </p>
                   <div className="text-xs text-slate-600">
                      © 2024 CA Monk. All rights reserved.
                   </div>
                </div>
                
                <div>
                    <h3 className="font-bold mb-6 text-slate-500 uppercase text-xs tracking-wider">Resources</h3>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-slate-500 uppercase text-xs tracking-wider">Platform</h3>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-slate-500 uppercase text-xs tracking-wider">Connect</h3>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-900 flex justify-end gap-6 text-xs text-slate-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
       </footer>
    </div>
  )
}

export default App



