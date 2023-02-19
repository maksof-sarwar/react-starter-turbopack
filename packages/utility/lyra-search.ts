import { create, insertBatch } from '@lyrasearch/lyra'

type Data = {
  name: string;
}

const db = await create({
  schema: {
    name: 'string',
  }
})


export async function createBook(book: any[]) {
  await insertBatch(db, book)
}