import { Outlet } from 'react-router-dom'
import Layout from './Layout'

const ShareLayout = () => {
  return (
    <Layout>
        <Outlet />
    </Layout>
  )
}

export default ShareLayout