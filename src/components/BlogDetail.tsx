import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '../services/api';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { Share2, ThumbsUp } from 'lucide-react';


interface BlogDetailProps {
  blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getBlogById(blogId!),
    enabled: !!blogId, // Only fetch if blogId is present
  });

  if (!blogId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 text-center bg-slate-50/50">
        <div className="h-24 w-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <ThumbsUp className="h-10 w-10 text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Select an Article</h2>
        <p className="max-w-xs mx-auto text-slate-500">
          Choose a financial insight from the feed on the left to start reading.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-[300px] w-full rounded-2xl" />
        <Skeleton className="h-12 w-3/4" />
        <div className="space-y-3 pt-4">
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-8">Unable to load content. Please try again.</div>;
  }

  if (!blog) return null;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 bg-white">
      
      {/* 1. Cover Image (Top, Rounded corners manually if needed, or full width) */}
      <div className="w-full h-[400px] shrink-0 overflow-hidden relative">
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="object-cover w-full h-full"
          onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Article+Image'
          }}
        />
        {/* Optional overlay gradient on bottom just in case */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
      </div>

      <div className="px-8 md:px-12 py-8 max-w-4xl mx-auto w-full -mt-0">
        
        {/* 2. Top Meta: Category • Read Time */}
        <div className="flex items-center gap-2 mb-4">
             <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{blog.category[0]}</span>
             <span className="text-slate-300">•</span>
             <span className="text-xs font-medium text-slate-500">{Math.ceil(blog.content.length / 500)} min read</span>
        </div>

        {/* 3. Main Title */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            {blog.title}
        </h1>

        {/* 4. Share Button */}
        <div className="mb-10">
             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold px-6 shadow-indigo-200 shadow-lg transition-transform active:scale-95">
                <Share2 className="mr-2 h-4 w-4" /> Share Article
             </Button>
        </div>

        {/* 5. Stats Box (Gray Box with Dividers) */}
        <div className="grid grid-cols-3 bg-slate-50 rounded-lg border border-slate-100 p-4 mb-10">
            <div className="flex flex-col items-center justify-center border-r border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</span>
                <span className="font-bold text-slate-800 text-sm md:text-base">{blog.category.join(' & ')}</span>
            </div>
            <div className="flex flex-col items-center justify-center border-r border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Read Time</span>
                <span className="font-bold text-slate-800 text-sm md:text-base">{Math.ceil(blog.content.length / 500)} Mins</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</span>
                <span className="font-bold text-slate-800 text-sm md:text-base">
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
            </div>
        </div>

        {/* 6. Lead Description */}
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
            {blog.description}
        </p>

        {/* 7. Content (Simulated Structure for Plain Text) */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-800">
             {/* Faking a section header if content is long enough, just for visuals */}
             {blog.content.length > 500 && (
                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                    The Rise of Automated Accounting
                </h3>
             )}
             
             {/* Render paragraphs */}
             {blog.content.split('\n\n').map((paragraph, idx) => (
                 <div key={idx}>
                    {/* Injecting a fake quote block for visual matching approx halfway */}
                    {idx === 1 && (
                        <div className="my-8 p-6 bg-indigo-50/50 rounded-r-lg border-l-4 border-indigo-500">
                            <p className="text-lg font-medium text-indigo-900 italic">
                                "The accountant of the future will be a data scientist, a storyteller, and a strategic partner, all rolled into one."
                            </p>
                        </div>
                    )}
                    <p className="mb-6 leading-8 text-slate-700">{paragraph}</p>
                 </div>
             ))}

             {/* Fake List for visual matching */}
             <ul className="list-disc pl-5 space-y-2 mb-8 text-slate-700">
                <li><strong className="text-slate-900">Strategic financial planning</strong> and analysis (FP&A).</li>
                <li><strong className="text-slate-900">Risk management</strong> and compliance auditing.</li>
                <li><strong className="text-slate-900">Advisory services</strong> for business growth.</li>
             </ul>
        </div>

        {/* 8. Footer Author Section */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src="https://github.com/shadcn.png" alt="Author" />
                </div>
                <div>
                     <p className="text-sm font-bold text-slate-900">Written by Arjun Mehta</p>
                     <p className="text-xs text-slate-500 font-medium">Senior Financial Analyst</p>
                </div>
             </div>
             
             {/* Action Icons */}
             <div className="flex items-center gap-4 text-slate-400">
                <ThumbsUp className="h-5 w-5 hover:text-indigo-600 cursor-pointer transition-colors" />
                <div className="w-px h-4 bg-slate-200"></div>
                {/* Chat Bubble Icon for comments */}
                <svg className="h-5 w-5 hover:text-indigo-600 cursor-pointer transition-colors" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
             </div>
        </div>

        <div className="h-20"></div> {/* Bottom Spacer */}
      </div>
    </div>
  );
}


