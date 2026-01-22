import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { PlusCircle, Loader2 } from 'lucide-react';
import type { NewBlog } from '../types';

export function CreateBlogForm() {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<NewBlog>({
    title: '',
    category: [],
    description: '',
    date: '',
    coverImage: '',
    content: ''
  });
  
  // Helper to handle comma-separated categories
  const [categoryInput, setCategoryInput] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setOpen(false);
      // Reset form
      setFormData({
        title: '',
        category: [],
        description: '',
        date: '',
        coverImage: '',
        content: ''
      });
      setCategoryInput('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogToSubmit: NewBlog = {
      ...formData,
      date: new Date().toISOString(),
      category: categoryInput.split(',').map(c => c.trim()).filter(c => c.length > 0)
    };
    mutation.mutate(blogToSubmit);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <PlusCircle size={16} />
          Create New Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Add a new article to the blog. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="category" className="text-sm font-medium">Categories (comma separated)</label>
            <Input
              id="category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Finance, Tech, AI"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="coverImage" className="text-sm font-medium">Cover Image URL</label>
            <Input
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">Short Description</label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief summary..."
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="content" className="text-sm font-medium">Full Content</label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article here..."
              className="min-h-[150px]"
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              Create Blog
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
