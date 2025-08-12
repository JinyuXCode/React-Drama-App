import { useEffect, useRef, useState } from "react";

// 示例数据结构
interface Drama {
  id: number;
  title: string;
  desc: string;
  cover: string;
}

// 模拟短剧数据
const mockDramas: Drama[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `短剧标题 ${i + 1}`,
  desc: "这里是短剧简介，内容简要介绍。",
  cover: "https://via.placeholder.com/120x160.png?text=Cover"
}));

function Home() {
  const [dramas, setDramas] = useState<Drama[]>(mockDramas);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  // 无限滚动加载更多
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setDramas(prev => [
              ...prev,
              ...Array.from({ length: 10 }).map((_, i) => ({
                id: prev.length + i + 1,
                title: `短剧标题 ${prev.length + i + 1}`,
                desc: "这里是短剧简介，内容简要介绍。",
                cover: "https://via.placeholder.com/120x160.png?text=Cover"
              }))
            ]);
            setLoading(false);
          }, 1000); // 模拟网络延迟
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#181A2A] flex flex-col">
      {/* 顶部标题栏 */}
      <header className="py-4 px-4 bg-[#23244A] text-white text-lg font-bold shadow">
        短剧推荐
      </header>
      {/* 列表区域 */}
      <main className="flex-1 px-4 pt-2 pb-16 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {dramas.map(drama => (
            <div
              key={drama.id}
              className="bg-[#23244A] rounded-xl shadow-md flex items-center p-3"
            >
              <img
                src={drama.cover}
                alt={drama.title}
                className="w-20 h-28 rounded-lg object-cover mr-3"
              />
              <div className="flex-1">
                <div className="text-white font-semibold text-base mb-1">{drama.title}</div>
                <div className="text-gray-300 text-sm">{drama.desc}</div>
              </div>
              {/* 可加收藏/播放按钮 */}
            </div>
          ))}
        </div>
        {/* 加载更多提示 */}
        <div ref={loader} className="h-8 flex items-center justify-center text-purple-400">
          {loading ? "加载中..." : "滑动加载更多"}
        </div>
      </main>
      {/* 底部导航栏预留 */}
      {/* <footer className="fixed bottom-0 left-0 w-full h-12 bg-[#23244A]"></footer> */}
    </div>
  );
}

export default Home;
