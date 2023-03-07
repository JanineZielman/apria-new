import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../components';

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}


Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};


// import { getNextStaticProps } from '@faustjs/next';
// import { client, OrderEnum, PostObjectsConnectionOrderbyEnum } from 'client';
// import { Footer, Header } from '../components';
// import { GetStaticPropsContext } from 'next';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import React from 'react';
// import styles from 'scss/pages/posts.module.scss';

// const POSTS_PER_PAGE = 6;

// export default function Page() {
//   const { query = {} } = useRouter();
//   const { postSlug, postCursor } = query;
//   const { usePosts, useQuery } = client;
//   const generalSettings = useQuery().generalSettings;
//   const isBefore = postSlug === 'before';
//   const posts = usePosts({
//     after: !isBefore ? (postCursor as string) : undefined,
//     before: isBefore ? (postCursor as string) : undefined,
//     first: !isBefore ? POSTS_PER_PAGE : undefined,
//     last: isBefore ? POSTS_PER_PAGE : undefined,
//   });

//   if (useQuery().$state.isLoading) {
//     return null;
//   }

//   return (
//     <>

//       <Head>
//         <title>
//           {generalSettings.title} - {generalSettings.description}
//         </title>
//       </Head>

//       <main className="content content-index">
        
        
//       </main>

//       <Footer />
//     </>
//   );
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   return getNextStaticProps(context, {
//     Page,
//     client,
//   });
// }