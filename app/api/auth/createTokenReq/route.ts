// import Ably from "ably/promises";
// import { NextResponse } from "next/server";

// // export async function GET(req: Request) {
// //   const client = new Ably.Rest({ authUrl: "/api/createTokenReq" });
// //   const token = await client.auth.createTokenRequest({
// //     clientId: process.env.ABLY_CLIENT_ID,
// //   });
// //   // Generate an Ably token for the user
// //   return NextResponse.json(token, {
// //     status: 200,
// //     statusText: "ok",
// //   });
// // }
// export async function GET(req: Request) {
//   const client = new Ably.Rest(process.env.ABLY_API_KEY as string);

//   const token = await client.auth.createTokenRequest({
//     clientId: process.env.ABLY_CLIENT_ID,
//     ttl: 172800,
//     capability: '{"*":["*"]}',
//   });
//   // Generate an Ably token for the user
//   return NextResponse.json(token, {
//     status: 200,
//     statusText: "ok",
//   });
// }
