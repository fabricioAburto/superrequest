// import superrequest, { HttpGetRequest } from '@joseaburto/superrequest';

// superrequest.set('Authorization', () => localStorage.get('token'));
// superrequest.set('BaseURL', 'http://www.hub.delinternet.com/api');

// // functional approach

// const UserMapper = {
//   toDomain: function (data) {
//     return {};
//   },
// };

// async function getAllUsers(data) {
//   const controller = new AbortController();
//   const url = superrequest
//     .buildURL('/user', {}, {})
//     .cacheMilliseconds(30000)
//     .get();

//   try {
//     const response = await superrequest
//       .debouncedMilliseconds(3000)
//       .post(url, data, { signal: controller.signal });
//     superrequest.expireURL(url);
//     return UserMapper.toDomain(response.data);
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // OOP Approach

// type User = {
//   id: string;
//   name: string;
//   email: string;
// };

// type Page = {
//   page: number;
//   size: number;
// };

// class UserCollectionMapper {
//   public static toDomain(rawUsers = []) {
//     return {};
//   }
// }

// class GetAllUsersUseCase extends HttpGetRequest<User[]> {
//   execute(page: Page): Promise<User[]> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const url = this.buildURL('/users', page).cacheSeconds(30000).get();
//         const { data } = await this.startTransaction()
//           .debounceSeconds(4000)
//           .execute(url);
//         resolve(UserCollectionMapper.toDomain(data));
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
// }
test('xxxx', () => {});
