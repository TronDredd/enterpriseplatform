# 企业供销平台API

## 登录

### request

- Method: **POST**
- URL: ```/login```
- Headers: 
```
{
    
}
```
- Body:
```
{
    "user_name": "admin",
    "password": "123456"
}
```

### response

- 登录成功
```
{
    "data": "login success"
}
```

- 登录失败,缺少参数
```
{
    "error_code": 400101,
    "error_message": "parameters are invalid",
    "data": null
}
```

- 登录失败,用户名或密码错误
```
{
    "error_code": 403101,
    "error_message": "user_name or password is invalid",
    "data": null
}
```

- 登录失败，其他异常
```
{
    "error_code": 500,
    "error_message": "other exception",
    "data": null
}
```

## 注册

### request

- Method: **POST**
- URL: ```/register```
- Headers:
```

```
- Body:
```
{
    "user_name": "Frank",
    "password": "666666",
    "telephone": "17732223332",
    "industry": "3"
}
```

### response

- 注册成功
```
{
    "data": "register success"
}
```

- 注册失败,用户名重复
```
{
    "error_code": 400102,
    "error_message": "username already exist",
    "data": null
}
```
- 注册失败,其他异常
```
{
    "error_code": 500,
    "error_message": "other exception",
    "data": null
}
```

## 需求列表

### request

- Method: 'GET'
- URL: ```/demand_list?page_num=1&page_size=20&filter=xxx```
- Headers: 
- Body
```json

```

### response

- 请求成功
```json
{
   "total": 2,
   "list": [
      {
         "content": "xxx",
         "user_id": "xxx",
         "update_time": "xxx",
         "category": "4",
         "description": "xxx"
      },
      {
         "content": "xxx",
         "user_id": "xxx",
         "update_time": "xxx",
         "category": "4",
         "description": "xxx"
      }
   ]
}
```

- 请求失败，缺少参数
```
{
    "error_code": 400101,
    "error_message": "parameters are invalid",
    "data": null
}
```

- 请求失败，其他异常
```json
{
   "error_code": 500,
   "error_message": "other exception",
   "data": null
}
```