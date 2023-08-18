

// vercel 서버리스 api

// NodeJS 환경에서 동작하게 된다.
// nodejs에는 fetch 함수가 없어서 오류가 발생하게 된다.
// nodejs에 'node-fetch@2' 패키지를 설치하여양 동작 할수있다.
import fetch from 'node-fetch';

const { KEY } = process.env

export default async function handler(request, response) {
  const DOMAIN = `https://omdbapi.com/?apikey=${KEY}`
  
  const { title, page, id } = JSON.parse(request.body)
  const url = id
      ? `${DOMAIN}&i=${id}&plot=full`
      : `${DOMAIN}&s=${title}&page=${page}`

  try {
    const res = await fetch(url)
    const json = await res.json()
    return response.status(200).json(json)
    
  }catch (error) {
    return response.status(400).json(error)
  }
}

