import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import {
  FiClock,
  FiCalendar,
  FiTag,
  FiArrowLeft,
  FiBookOpen,
  FiUser,
  FiGrid,
  FiHome,
  FiArrowRight,
  FiZap,
  FiStar,
  FiArchive,
  FiBookmark,
  FiFeather,
  FiCompass,
} from "react-icons/fi";
import { FaHashtag } from "react-icons/fa";

export const metadata = {
  title: "المدونة | إسلام هداية",
  description: "مقالات تقنية في تطوير الويب، Next.js، React، والبرمجة بشكل عام",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  // مقالات مميزة (آخر 3 مقالات)
  const featuredPosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* شريط التنقل */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--nav-border)]">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all duration-300"
          >
            <FiHome
              className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors"
              size={18}
            />
            <span className="text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors">
              الرئيسية
            </span>
            <FiArrowRight
              className="text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
              size={14}
            />
          </Link>

          <span className="text-xs text-[var(--text-muted)] flex items-center gap-2">
            <FiBookOpen size={14} className="hidden sm:block" />
            <span className="font-medium text-[var(--foreground)]">
              {posts.length}
            </span>
            مقالة
          </span>
        </div>

        {/* الهيدر */}
        <div className="relative mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4">
              <FiFeather className="text-[var(--primary)]" size={16} />
              <span className="text-xs font-medium text-[var(--primary)]">
                المدونة التقنية
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight">
              <FiCompass
                className="inline-block text-[var(--primary)] mb-1 mr-2"
                size={36}
              />{" "}
              مقالات و<span className="text-[var(--primary)]">خبرات</span>
            </h1>
            <p className="mt-4 text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              نشارككم رحلتنا في عالم البرمجة، أحدث التقنيات، ونصائح عملية من
              واقع التجربة
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-2">
                <FiZap className="text-[var(--primary)]" size={16} />
                {posts.length} مقالة
              </span>
              <span className="flex items-center gap-2">
                <FiTag className="text-[var(--accent)]" size={16} />
                {categories.length} تصنيف
              </span>
            </div>
          </div>
        </div>

        {/* مقالات مميزة */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-[var(--primary)] rounded-full" />
              <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <FiStar className="text-yellow-400" size={20} />
                مقالات مميزة
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${encodeURIComponent(post.slug)}`}
                  className={`group relative overflow-hidden rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] p-6 hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-500 ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-[var(--primary)]/10 text-[var(--primary)] uppercase tracking-wider">
                        {post.category || "عام"}
                      </span>
                      {index === 0 && (
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                          <FiZap size={10} />
                          الأحدث
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                      {post.excerpt || "لا يوجد ملخص لهذا المقال"}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar size={13} />
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString(
                              "ar-EG",
                            )
                          : "جديد"}
                      </span>

                      <span className="flex items-center gap-1.5 text-[var(--primary)]">
                        <FiArrowLeft size={13} />
                        <span className="text-[10px]">اقرأ</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* التصنيفات */}
        {categories.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[var(--accent)] rounded-full" />
                <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                  <FiArchive size={20} />
                  التصنيفات
                </h2>
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                {categories.length} تصنيف
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="group px-5 py-2.5 rounded-full text-sm font-bold bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <FiGrid size={16} />
                  الكل
                </span>
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${encodeURIComponent(category)}`}
                  className="group px-4 py-2 rounded-full text-sm font-medium border border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5 hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-all duration-300"
                >
                  <span className="flex items-center gap-1.5">
                    <FaHashtag
                      size={12}
                      className="text-[var(--text-muted)] group-hover:text-[var(--primary)]"
                    />
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* جميع المقالات */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <FiFeather className="text-6xl text-[var(--text-muted)] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
              لا توجد مقالات حالياً
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              ترقبوا المقالات القادمة قريباً ✨
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[var(--primary)] rounded-full" />
                <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                  <FiBookmark size={20} />
                  جميع المقالات
                </h2>
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                {posts.length} مقالة
              </span>
            </div>
            <div className="grid gap-4">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${encodeURIComponent(post.slug)}`}
                  className="group block p-5 rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/5 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="hidden sm:block text-4xl font-bold text-[var(--nav-border)] group-hover:text-[var(--primary)]/20 transition-colors w-14 text-center">
                      #{String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[var(--primary)]/10 text-[var(--primary)] uppercase tracking-wider">
                          {post.category || "عام"}
                        </span>
                        {post.tags &&
                          post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-[9px] font-medium border border-[var(--nav-border)] text-[var(--text-muted)] flex items-center gap-0.5"
                            >
                              <FaHashtag size={8} />
                              {tag}
                            </span>
                          ))}
                        {post.tags && post.tags.length > 3 && (
                          <span className="text-[9px] text-[var(--text-muted)] font-medium">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[var(--text-muted)] line-clamp-1 leading-relaxed">
                        {post.excerpt || "لا يوجد ملخص لهذا المقال"}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={13} />
                          {post.created_at
                            ? new Date(post.created_at).toLocaleDateString(
                                "ar-EG",
                              )
                            : "جديد"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiClock size={13} />
                          {post.reading_time || 3} د
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiUser size={13} />
                          {post.author || "إسلام هداية"}
                        </span>
                        <span className="flex items-center gap-1.5 text-[var(--primary)]">
                          <FiArrowLeft size={13} />
                          <span className="text-[10px] font-medium group-hover:translate-x-0.5 transition-transform">
                            اقرأ
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:block p-3 rounded-xl bg-[var(--nav-border)] text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:bg-[var(--primary)]/10 transition-all duration-300">
                      <FiBookOpen size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* فوتر المدونة */}
        <div className="mt-16 pt-8 border-t border-[var(--nav-border)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-2">
              <FiFeather size={14} />
              مدونة إسلام هداية — شارك معرفتك مع العالم
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)]">تابعني:</span>
              <a
                href="https://github.com/eslam-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/eslam-hadaya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
