import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import satori from 'satori'
import sharp from 'sharp'

const BLOG_DIR = 'src/content/blog'
const OG_DIR = 'public/og'
const FONT_PATH = 'public/fonts/atkinson-bold.woff'

const font = fs.readFileSync(FONT_PATH)

fs.mkdirSync(OG_DIR, { recursive: true })

const posts = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

for (const file of posts) {
  const slug = file.replace(/\.(md|mdx)$/, '')
  const outPath = path.join(OG_DIR, `${slug}.png`)

  if (fs.existsSync(outPath)) {
    console.log(`skip: ${slug}`)
    continue
  }

  const src = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
  const { data } = matter(src)
  const title = data.title || slug

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a2e',
          padding: '60px',
        },
        children: {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '52px',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '28px',
                    color: '#8888aa',
                  },
                  children: 'yusukev.com',
                },
              },
            ],
          },
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Atkinson',
          data: font,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  fs.writeFileSync(outPath, png)
  console.log(`generated: ${slug}`)
}
