const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://binaa-server.vercel.app/api";

export function normalizePostSlug(value) {
  if (value === null || value === undefined) return "";

  let slug = String(value).trim();

  try {
    const decoded = decodeURIComponent(slug);
    if (decoded && decoded !== slug) {
      slug = decoded;
    }
  } catch {
    // إذا كان الـ slug لا يحتوي على ترميز URL، نترك القيمة كما هي
  }

  return slug.normalize("NFC").trim();
}

// جلب جميع المقالات من API
export async function getAllPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("خطأ في جلب المقالات:", res.status);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data.posts)) {
      return [];
    }

    return data.posts.map((post) => ({
      ...post,
      slug: normalizePostSlug(post.slug),
    }));
  } catch (error) {
    console.error("خطأ في جلب المقالات:", error);
    return [];
  }
}

// جلب مقالة واحدة عن طريق الـ slug
export async function getPostBySlug(slug) {
  try {
    const normalizedSlug = normalizePostSlug(slug);
    const res = await fetch(`${API_URL}/posts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const posts = Array.isArray(data.posts)
      ? data.posts.map((post) => ({
          ...post,
          slug: normalizePostSlug(post.slug),
        }))
      : [];

    return (
      posts.find((post) => normalizePostSlug(post.slug) === normalizedSlug) ||
      null
    );
  } catch (error) {
    console.error("خطأ في جلب المقالة:", error);
    return null;
  }
}

// جلب المقالات حسب التصنيف
export async function getPostsByCategory(category) {
  try {
    const posts = await getAllPosts();
    return posts.filter((post) => post.category === category);
  } catch (error) {
    console.error("خطأ في جلب المقالات حسب التصنيف:", error);
    return [];
  }
}

// جلب جميع التصنيفات
export async function getAllCategories() {
  try {
    const posts = await getAllPosts();
    return [...new Set(posts.map((post) => post.category).filter(Boolean))];
  } catch (error) {
    console.error("خطأ في جلب التصنيفات:", error);
    return [];
  }
}
