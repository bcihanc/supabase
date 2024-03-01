import clientLibsCommonSections from '~/spec/common-client-libs-sections.json'
import typeSpec from '~/spec/enrichments/tsdoc_v2/combined.json'
import spec from '~/spec/supabase_csharp_v0.yml' assert { type: 'yml' }
import RefSectionHandler from '~/components/reference/RefSectionHandler'
import { flattenSections } from '~/lib/helpers'
import handleRefGetStaticPaths from '~/lib/mdx/handleRefStaticPaths'
import handleRefStaticProps from '~/lib/mdx/handleRefStaticProps'
import { useRouter } from 'next/router'
import RefSEO from '~/components/reference/RefSEO'
import { MenuId } from '~/components/Navigation/NavigationMenu/NavigationMenu'
import { TypeSpec } from '~/components/reference/Reference.types'

const sections = flattenSections(clientLibsCommonSections)
const libraryPath = '/csharp'

export default function CSharpReference(props) {
  const router = useRouter()
  const slug = router.query.slug?.[0]
  const filteredSection = sections.filter((section) => slug && section.id === slug)

  const pageTitle = filteredSection[0]?.title
    ? `${filteredSection[0]?.title} | Supabase`
    : 'Supabase'

  return (
    <>
      <RefSEO title={pageTitle} />

      <RefSectionHandler
        menuId={MenuId.RefCSharpV0}
        sections={filteredSection}
        spec={spec}
        typeSpec={typeSpec as TypeSpec}
        pageProps={props}
        type="client-lib"
      />
    </>
  )
}

export async function getStaticProps() {
  return handleRefStaticProps(sections, libraryPath)
}

export async function getStaticPaths() {
  return handleRefGetStaticPaths(sections)
}
