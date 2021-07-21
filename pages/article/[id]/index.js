import {useRouter} from 'next/router'
import Meta from '../../../components/Meta';
import Link from 'next/link'
import {server } from '../../../config'
const article = (props) => {

    const {article} = props;
    console.log(article)
    // const router = useRouter()
    // const {id} = router.query;
    
    return (
        <div>
            <Meta title='title page'/>
           <h1>This is article {article.id}</h1> 
           <p>{article.title}</p>
           <br />
           <Link href='/'>Go back</Link>

        </div>
    );
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`)
    
    const article = await res.json();

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async ( ) => {
    const res = await fetch(`${server}/api/articles`)
    
    const articles = await res.json();

    const ids = articles.map(article => article.id)

    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return { 
        paths,
        fallback: false
    }
}



export default article;
