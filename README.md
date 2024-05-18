# Bon Voyage!

> Trip Review SNS project - using Next.js

`npm`

```Shell
git clone git@github.com:lain-alice/bonvoyage-sns-next.git
cd bonvoyage-sns-next
npm install
npm run dev
```

`yarn`

```Shell
git clone git@github.com:lain-alice/bonvoyage-sns-next.git
cd bonvoyage-sns-next
yarn install
yarn run dev
```

</br>

## 1. 소개

<!-- <img src="https://github.com/hwb0218/look-so-p/assets/52212226/71d1580f-27e9-43d2-96df-bb90dc3af0b8" alt="Image 1" width="100%"> -->

<https://www.bonvoyagewith.site/>

테스트 계정

> id: admin@gmail.com  
> password: 1q2w3e4r!

</br>

### 1.1 제작 기간 & 참여 인원

- 1차 배포: 2024/05/14 ~
- 개인 프로젝트
- 제작자: 이승현 https://lain-alice.tistory.com/

## 2. 사용 기술

<div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/React--Query-f04f3d?style=flat-square&logo=ReactQuery&logoColor=white"/>
    <img src="https://img.shields.io/badge/Context--API-61DAFB?style=flat-square&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
    <img src="https://img.shields.io/badge/Shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white"/>
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/>
</div>

### 2.1 아키텍쳐

<!-- <img src="https://github.com/hwb0218/look-so-p/assets/52212226/71d1580f-27e9-43d2-96df-bb90dc3af0b8" alt="Image 1" width="100%"> -->

### 2.2 기술적 의사결정

| 사용 기술       | 설명                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Next.js         | 라우팅, 이미지 최적화 등의 작업을 프레임워크가 제공하는 기능으로 해결하여 개발 시간 단축. SSR과 CSR을 각각 사용처에 맞게 적용.      |
| Firebase        | 사용자 인증, 데이터베이스, 파일 저장소를 백엔드 코드 없이 빠르게 구현                                                               |
| React-Query     | d                                                                                                                                   |
| TypeScript      | 타입 오류 방지, 변수, 객체의 형태, 구성을 자동 완성 기능을 통해 빠르게 파악 가능                                                    |
| TailwindCSS     | Next.js 초기 개발 환경 설정 시 기본적으로 적용, 색상 선택 등에 소비하는 시간을 절약하고 협업에도 유리한 일관적인 CSS 형식 활용 가능 |
| Shadcn/ui       | ㅇ                                                                                                                                  |
| react-hook-form | ㅇ                                                                                                                                  |
| zod             | ㅇ                                                                                                                                  |
| Vercel          | ㅇ                                                                                                                                  |

</br>

## 3. 트러블슈팅

<details>
<summary><b>1. 트러블슈팅</b></summary>
<div markdown="1">

#### 문제

- ㅇ

#### 원인

- ㅇ

#### 해결

- ㅇ
</div>
</details>

<!-- <details>
<summary><b>1. throw Error의 에러 전파</b></summary>
<div markdown="1">

#### 문제

- 등록 상품 수정 시 이미지를 제외한 입력 필드만 변경했을 경우 invalidateQueries가 호출되지 않음

#### 원인

- throw된 에러는 catch block에서 처리하지 않으면 호출자 방향으로 점진적 전파된다.
- storageService.deleteFiles 메소드 내부에서 fileURLs 인자가 배열이 아니거나 undefined일 경우 throw Error를 던지므로
  다음 코드가 실행되지 않고 호출자의 catch block으로 코드 흐름이 넘어갔음

<img width="750" alt="스크린샷 2024-02-06 오후 8 49 43" src="https://github.com/hwb0218/look-so-p/assets/52212226/81e32c2e-0ed4-41fb-9c80-d3ff1df373d2">

#### 해결

- 에러를 던지지 않도록 throw Error 코드를 제거

<img width="750" alt="스크린샷 2024-02-06 오후 8 49 59" src="https://github.com/hwb0218/look-so-p/assets/52212226/4293e49d-8760-4dbd-a654-2cda8fa032db">

</div>
</details> -->

### Commit Convention

|  Message   | 설명                                                        |
| :--------: | :---------------------------------------------------------- |
|   [feat]   | 새로운 기능 추가                                            |
|   [fix]    | 버그 수정                                                   |
|  [design]  | CSS 등 사용자 UI 디자인 변경                                |
|  [style]   | 코드 포맷 변경, 세미콜론 누락, 코드수정이 없는 경우.        |
| [refactor] | 코드 리팩토링                                               |
| [comment]  | 주석 추가 및 변경                                           |
|   [docs]   | 문서 수정                                                   |
|   [test]   | 테스트 코드 작업을할 경우                                   |
|  [chore]   | 빌드 테스트 업데이트, 패키지 매니저 설정, gitignore 등 수정 |
|  [rename]  | 파일, 폴더명 수정                                           |
|  [remove]  | 파일, 폴더 삭제                                             |
