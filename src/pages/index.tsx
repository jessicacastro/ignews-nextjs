import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import { transformToUsd } from '../utils/transformToUsd'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span> 
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // unit_amount represents the amount in cents.
  const { id, unit_amount } = await stripe.prices.retrieve('price_1LnrgiKf12OiUeMFKc2TlgeA')

  return {
    props: {
      product: {
        priceId: id,
        amount: transformToUsd(unit_amount / 100)
      }
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}