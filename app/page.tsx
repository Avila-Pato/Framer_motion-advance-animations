

const Links = [
  {id:1 , title:"Home", url:"/"},
  {id:2 , title:"Split vignette", url:"/pages/Split-Vignette"},
  {id:3 , title:"Card Parallax", url:"/pages/Card-parallax"},
]

export default function Home() {

  return (
    <main className="min-h-screen  w-full p-12">
        <nav>
            <ul className="flex gap-4" >
                {Links.map((link) => (
                    <li key={link.id} > 
                        <a href={link.url}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </main>
  );
}
