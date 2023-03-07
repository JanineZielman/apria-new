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

  // const { title: siteTitle, description: siteDescription } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const posts = data?.posts?.nodes ?? [];

  console.log(posts)

  return (
    <>
      {/* <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      /> */}
      <Main>
        <Container>
          <div className='grid'>
            {posts.map((item, i) => {
              return(
                <div className='post-item' key={`post${i}`}>
                  <img src={item.featuredImage.node.mediaItemUrl}/>
                  <h2 className='subtitle'>{item.title}</h2>
                </div>
              )
            })}
          </div>
        </Container>
      </Main>
      {/* <Footer title={siteTitle} menuItems={footerMenu} /> */}
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
    posts {
      nodes {
        slug
        title
        featuredImage{
          node{
            mediaItemUrl
          }
        }
        categories {
          edges {
            node {
              id
            }
          }
        }
      }
    }
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


