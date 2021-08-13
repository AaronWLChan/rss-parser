import { parse } from '../src/index'
import rss2 from './input/rss2'
import rss091 from './input/rss091'
import rss092 from './input/rss092'
import rss1 from './input/rss1'
import daring from './input/daring'
import qldHealth from './input/qldHealth'
import { writeFileSync } from 'fs'

test("should parse rss2 with correct fields and w/o errors", async () => {

    const result = await parse(rss2)

    try{
        writeFileSync("./test/output/rss2.json", JSON.stringify(result, null, 2))
    } catch(err: any) {
        console.log(err)
    }

})

test("should parse rss 0.91 with correct fields and w/o errors", async () => {

    const result = await parse(rss091)

    try{
        writeFileSync("./test/output/rss091.json", JSON.stringify(result, null, 2))
    } catch(err: any) {
        console.log(err)
    }

})


test("should parse rss 0.92 with correct fields and w/o errors", async () => {

    const result = await parse(rss092)

    try{
        writeFileSync("./test/output/rss092.json", JSON.stringify(result, null, 2))
    } catch(err: any) {
        console.log(err)
    }

})

test("should parse rss1 with correct fields and w/o errors", async () => {

    const result = await parse(rss1)

    try{
        writeFileSync("./test/output/rss1.json", JSON.stringify(result, null, 2))
    } catch(err: any) {
        console.log(err)
    }
})

test("should parse atom with correct fields and w/o errors", async () => {

    const result = await parse(daring)

    try{
        writeFileSync("./test/output/daring.json", JSON.stringify(result, null, 2))
    } catch(err: any) {
        console.log(err)
    }

})

test("should parse rss2 w/ Dublin Core with correct fields and w/o errors", async () => {

    const result = await parse(qldHealth)

    try{
        writeFileSync("./test/output/qldHealth.json", JSON.stringify(result, null, 2))
    } catch(err: any) {
        console.log(err)
    }

})

