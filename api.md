### 接口文档：`POST /api/auth/login`

#### 描述
该端点用于用户认证。它验证提供的电子邮件和密码，如果有效，则返回一个JSON Web Token (JWT)以供进一步的认证请求使用。

#### 端点
`POST /api/auth/login`

#### 请求体
请求体必须是一个包含以下字段的JSON对象：

- `email` (string): 用户的电子邮件地址。
- `password` (string): 用户的密码。

```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

#### 响应

##### 成功 (200)
如果电子邮件和密码有效，响应将包含以下字段：

- `success` (boolean): 表示登录操作成功。
- `message` (string): 一个消息，表明登录成功。
- `token` (string): 一个JWT，用于认证请求。

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

响应还将设置一个包含JWT的`auth_token` cookie。

##### 错误 (400)
如果电子邮件或密码无效，响应将包含一个错误消息。可能的错误消息包括：

- `需要电子邮件和密码`
- `无效的电子邮件或密码`

```json
{
  "statusCode": 400,
  "statusMessage": "无效的电子邮件或密码"
}
```

#### 示例请求
```bash
curl -X POST 'http://yourdomain.com/api/auth/login' \
-H 'Content-Type: application/json' \
-d '{
  "email": "user@example.com",
  "password": "userpassword"
}'
```

#### 示例响应
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

---

### 接口文档：`POST /api/auth/logout`

#### 描述
该端点用于用户注销。它清除认证令牌（JWT），使用户的会话无效。

#### 端点
`POST /api/auth/logout`

#### 请求体
无需请求体。

#### 响应

##### 成功 (200)
如果注销成功，响应将包含以下字段：

- `success` (boolean): 表示注销操作成功。
- `message` (string): 一个消息，表明注销成功。

```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### 示例请求
```bash
curl -X POST 'http://yourdomain.com/api/auth/logout'
```

#### 示例响应
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 接口文档：`POST /api/auth/register`

#### 描述
该端点用于用户注册。它接收用户名、电子邮件和密码，创建一个新用户，并将密码进行哈希处理后存储在数据库中。

#### 端点
`POST /api/auth/register`

#### 请求体
请求体必须是一个包含以下字段的JSON对象：

- `username` (string): 用户名。
- `email` (string): 用户的电子邮件地址。
- `password` (string): 用户的密码。

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "newpassword"
}
```

#### 响应

##### 成功 (200)
如果用户注册成功，响应将包含以下字段：

- `success` (boolean): 表示注册操作成功。
- `message` (string): 一个消息，表明用户注册成功。

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

##### 错误 (400)
如果注册信息无效或用户已存在，响应将包含一个错误消息。可能的错误消息包括：

- `All fields are required`
- `Username or email already exists`

```json
{
  "statusCode": 400,
  "statusMessage": "Username or email already exists"
}
```

#### 示例请求
```bash
curl -X POST 'http://yourdomain.com/api/auth/register' \
-H 'Content-Type: application/json' \
-d '{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "newpassword"
}'
```

#### 示例响应
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### 接口文档：`GET /api/auth/user`

#### 描述
该端点用于获取已认证用户的信息。它通过验证用户的身份令牌，返回用户的详细信息。

#### 端点
`GET /api/auth/user`

#### 请求头
请求头必须包含一个有效的JWT令牌，以进行身份验证。

```http
Authorization: Bearer <token>
```

#### 响应

##### 成功 (200)
如果身份验证成功，响应将包含以下字段：

- `success` (boolean): 表示请求操作成功。
- `user` (object): 用户的详细信息。

```json
{
  "success": true,
  "user": {
    "user_id": 1,
    "username": "exampleuser",
    "email": "user@example.com",
    "created_at": "2023-01-01T00:00:00.000Z"
  }
}
```

##### 错误 (401)
如果身份验证失败，响应将包含一个错误消息。可能的错误消息包括：

- `Unauthorized`

```json
{
  "statusCode": 401,
  "statusMessage": "Unauthorized"
}
```

#### 示例请求
```bash
curl -X GET 'http://yourdomain.com/api/auth/user' \
-H 'Authorization: Bearer <token>'
```

#### 示例响应
```json
{
  "success": true,
  "user": {
    "user_id": 1,
    "username": "exampleuser",
    "email": "user@example.com",
    "created_at": "2023-01-01T00:00:00.000Z"
  }
}
```

---

### 中间件文档：`auth.ts`

#### 描述
该中间件用于验证请求中的JWT令牌。如果令牌有效，解析其内容并将用户信息添加到请求上下文中；如果令牌无效或不存在，则返回未认证的错误。

#### 用法
在需要身份验证的路由中使用此中间件，以确保请求中包含有效的JWT令牌。

#### 实现

```typescript
import { defineEventHandler, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'twitterClone';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, username: string };
    event.context.auth = {
      userId: decoded.userId,
      username: decoded.username,
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    });
  }
});
```

#### 参数
- `event`: 当前请求的事件对象，用于获取请求头中的令牌和设置请求上下文。

#### 功能
1. **获取令牌**：从请求的Cookie中获取`auth_token`。
2. **验证令牌**：使用`jsonwebtoken`库验证令牌的有效性。
3. **解析令牌**：如果令牌有效，将解析后的用户信息添加到请求上下文中。
4. **错误处理**：如果令牌不存在或无效，抛出401未认证的错误。

#### 示例
以下是如何在需要身份验证的API端点中使用此中间件的示例：

```typescript
// server/api/auth/user.ts

import { defineEventHandler } from 'h3';
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  await authMiddleware(event); // 应用身份验证中间件

  const user = event.context.auth;

  return {
    success: true,
    user,
  };
});
```

#### 错误响应

##### 未认证 (401)
如果令牌不存在或无效，响应将包含一个错误消息。可能的错误消息包括：

- `Not authenticated`
- `Invalid token`

```json
{
  "statusCode": 401,
  "statusMessage": "Not authenticated"
}
```

---

### 接口文档：`GET /api/tweets/:id`

#### 描述
该端点用于获取指定ID的推文。它从数据库中查询推文信息并返回结果。

#### 端点
`GET /api/tweets/:id`

#### 请求参数
- `id` (string): 推文的唯一标识符（推文ID）。

#### 响应

##### 成功 (200)
如果推文存在，响应将包含以下字段：

- `success` (boolean): 表示请求操作成功。
- `data` (object): 推文的详细信息。

```json
{
  "success": true,
  "data": {
    "tweet_id": 123,
    "user_id": 1,
    "content": "This is a tweet",
    "created_at": "2023-01-01T00:00:00.000Z"
  }
}
```

##### 错误 (404)
如果推文不存在，响应将包含一个错误消息。

```json
{
  "success": false,
  "message": "Tweet not found"
}
```

##### 错误 (500)
如果查询过程中发生错误，响应将包含一个错误消息。

```json
{
  "success": false,
  "message": "Failed to fetch tweet"
}
```

#### 示例请求
```bash
curl -X GET 'http://yourdomain.com/api/tweets/123'
```

#### 示例响应
```json
{
  "success": true,
  "data": {
    "tweet_id": 123,
    "user_id": 1,
    "content": "This is a tweet",
    "created_at": "2023-01-01T00:00:00.000Z"
  }
}
```

---

### 接口文档：`POST /api/tweets`

#### 描述
该端点用于创建新的推文。它接收用户ID和推文内容，验证用户身份后，将推文存储到数据库中。

#### 端点
`POST /api/tweets`

#### 请求头
请求头必须包含一个有效的JWT令牌，以进行身份验证。

```http
Authorization: Bearer <token>
```

#### 请求体
请求体必须是一个包含以下字段的JSON对象：

- `user_id` (number): 用户的唯一标识符。
- `content` (string): 推文的内容。

```json
{
  "user_id": 1,
  "content": "This is a new tweet"
}
```

#### 响应

##### 成功 (200)
如果推文创建成功，响应将包含以下字段：

- `success` (boolean): 表示推文创建操作成功。
- `message` (string): 一个消息，表明推文创建成功。

```json
{
  "success": true,
  "message": "Tweet created successfully"
}
```

##### 错误 (400)
如果输入参数无效，响应将包含一个错误消息。

```json
{
  "success": false,
  "message": "Invalid input parameters"
}
```

##### 错误 (500)
如果推文创建过程中发生错误，响应将包含一个错误消息。

```json
{
  "success": false,
  "message": "Failed to create tweet"
}
```

#### 示例请求
```bash
curl -X POST 'http://yourdomain.com/api/tweets' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "user_id": 1,
  "content": "This is a new tweet"
}'
```

#### 示例响应
```json
{
  "success": true,
  "message": "Tweet created successfully"
}
```
