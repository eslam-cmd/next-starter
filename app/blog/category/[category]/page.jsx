import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { FiCalendar, FiClock, FiArrowLeft } from "react-icons/fi";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return {
    title: `${decodedCategory} | المدونة التقنية`,
    description: `مقالات في ${decodedCategory}`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = await getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors mb-4"
          >
            <FiArrowLeft size={18} />
            العودة للمدونة
          </Link>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            📂 {decodedCategory}
          </h1>
          <p className="mt-2 text-[var(--text-muted)]">
            {posts.length} مقالة في هذا التصنيف
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="group block p-6 rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={14} />
                  {new Date(post.date).toLocaleDateString("ar-EG")}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock size={14} />
                  {post.readingTime} دقائق
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
