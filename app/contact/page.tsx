import CommentForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        ติดต่อเรา
      </h1>

      <CommentForm postId="blog-post-1" />
    </main>
  );
}