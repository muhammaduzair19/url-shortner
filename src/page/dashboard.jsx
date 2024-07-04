import error from "@/components/error"
import Error from "@/components/error"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import LinkCard from "@/components/ui/link-card"
import { UrlState } from "@/context"
import { getClicks } from "@/db/apiClicks"
import { getUrls } from "@/db/apiUrls"
import useFetch from "@/hooks/use-Fetch"
import { Filter } from "lucide-react"
import { useEffect, useState } from "react"

import { BarLoader } from 'react-spinners'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { user } = UrlState();
  const { data: urls, loading, fn: fnUrls } = useFetch(getUrls, user?.id)

  const { data: clicks, loading: clicksLoading, fn: fnClicks } = useFetch(getClicks, urls?.map((url) => url?.id))

  useEffect(() => {
    fnUrls()
  }, [])

  useEffect(() => {
    if (urls?.length) fnClicks()
  }, [urls?.length]);


  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  )




  return (
    <div className="flex flex-col gap-8">
      {
        (loading || clicksLoading) && <BarLoader width={'100%'} color='#36d7b7' />
      }
      <div className="grid grid-cols-2 gap-4">

        <Card>
          <CardHeader>
            <CardTitle>Total Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="font-extrabold text-4xl">
          My Links
        </h1>
        <Button>
          Create Link
        </Button>
      </div>

      <div className="relative">
        <Input
          type='text'
          placeholder='Filter links....'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error.message} />}
      {
        (filteredUrls || []).map((url, i) => {
          return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        })
      }
    </div>
  )
}

export default Dashboard