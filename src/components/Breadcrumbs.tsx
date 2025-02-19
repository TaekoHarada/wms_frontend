"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname(); // 現在のパスを取得
  const pathSegments = pathname.split("/").filter((segment) => segment); // パスを分割して配列化

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/"); // 階層ごとにリンクを作成
    const isLast = index === pathSegments.length - 1; // 最後の要素か判定
    let displayName = segment; // デフォルトはパス名

    // 特定のパス名を日本語に変更
    if (segment === "products") displayName = "商品一覧";
    else if (segment === "edit") displayName = "編集";
    else if (!isNaN(Number(segment))) displayName = `商品ID ${segment}`; // 数字なら商品ID

    return (
      <li key={href} className={`inline ${isLast ? "text-gray-500" : ""}`}>
        {!isLast ? (
          <Link href={href} className="text-blue-600 hover:underline">
            {displayName}
          </Link>
        ) : (
          <span>{displayName}</span>
        )}
        {!isLast && <span className="mx-2">›</span>}
      </li>
    );
  });

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ul className="flex">{breadcrumbItems}</ul>
    </nav>
  );
}
