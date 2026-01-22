import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../services/api';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUp, GraduationCap, Scale, Lightbulb, Laptop } from 'lucide-react';
import { Badge } from './ui/badge';

interface BlogListProps {
  selectedBlogId: string | null;
  onSelectBlog: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toUpperCase();
  if (cat.includes('FINANCE')) return <TrendingUp className="w-3 h-3 text-indigo-600" />;
  if (cat.includes('CAREER')) return <GraduationCap className="w-3 h-3 text-slate-600" />;
  if (cat.includes('REGULATION')) return <Scale className="w-3 h-3 text-slate-600" />;
  if (cat.includes('SKILL')) return <Lightbulb className="w-3 h-3 text-amber-500" />;
  if (cat.includes('TECH')) return <Laptop className="w-3 h-3 text-blue-500" />;
  return <TrendingUp className="w-3 h-3 text-slate-400" />;
};

const getBadgeForCategory = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes('FINANCE')) return 'Featured';
    if (cat.includes('CAREER')) return 'Study Tips';
    if (cat.includes('REGULATION')) return 'Taxation';
    if (cat.includes('SKILL')) return 'Development';
    return null;
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading blogs</div>;
  }

  const sortedBlogs = blogs?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col gap-4 p-1">
      {sortedBlogs?.map((blog) => {
        const isSelected = selectedBlogId === blog.id;
        const pillText = getBadgeForCategory(blog.category[0]);
        
        return (
            <div 
            key={blog.id} 
            onClick={() => onSelectBlog(blog.id)}
            className={cn(
                "relative flex flex-col gap-2 p-4 rounded-xl cursor-pointer transition-all duration-200 bg-white border border-slate-100 shadow-sm hover:shadow-md",
                isSelected ? "border-l-4 border-l-indigo-600 pl-[13px]" : "border-l-4 border-l-transparent" 
                // Adjust padding left to compensate for border width change so content doesn't jump
            )}
            >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    {getCategoryIcon(blog.category[0])}
                    <span className={cn(
                        "text-[10px] uppercase font-bold tracking-wider",
                        isSelected ? "text-indigo-600" : "text-slate-500"
                    )}>
                        {blog.category[0]}
                    </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                    {formatDistanceToNow(new Date(blog.date), { addSuffix: true })}
                </span>
            </div>

            <h3 className={cn(
                "font-bold text-base leading-snug text-slate-900 mt-1",
            )}>
                {blog.title}
            </h3>
            
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {blog.description}
            </p>

            {pillText && (
                <div className="mt-2">
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-0 text-[10px] px-2 py-0.5 font-medium rounded-md">
                        {pillText}
                    </Badge>
                </div>
            )}
            </div>
        );
      })}
    </div>
  );
}




