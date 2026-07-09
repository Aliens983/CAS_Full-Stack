# 企业级前端项目

一个基于 Vue 3 + TypeScript + Vite 的企业级前端项目，采用现代化的技术栈和最佳实践。

## 项目特点

- **现代化技术栈**: Vue 3 + TypeScript + Vite + Pinia + Vue Router
- **企业级架构**: 清晰的分层架构，易于维护和扩展
- **UI组件库**: Element Plus + Tailwind CSS
- **代码规范**: ESLint + Prettier + TypeScript
- **响应式设计**: 支持多端适配
- **状态管理**: Pinia状态管理
- **路由管理**: Vue Router路由管理
- **API封装**: Axios请求封装
- **样式系统**: SCSS变量系统 + 全局工具类

## 项目结构

```
enterprise-frontend/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── assets/             # 资源文件
│   │   └── styles/         # 样式文件
│   │       ├── global.css  # 全局样式
│   │       └── variables.scss  # 样式变量
│   ├── components/         # 公共组件
│   │   └── Loading.vue     # 加载组件
│   ├── views/              # 页面组件
│   │   ├── auth/           # 认证页面
│   │   │   ├── Login.vue   # 登录页
│   │   │   └── Register.vue # 注册页
│   │   ├── dashboard/      # 仪表盘页面
│   │   │   └── Index.vue   # 仪表盘首页
│   │   ├── bookings/       # 预约管理页面
│   │   │   └── Index.vue   # 预约列表页
│   │   ├── rooms/          # 会议室页面
│   │   ├── equipment/      # 设备预约页面
│   │   ├── consultation/   # 咨询服务页面
│   │   └── admin/          # 管理后台页面
│   ├── router/             # 路由配置
│   │   └── index.ts        # 路由配置文件
│   ├── stores/             # 状态管理
│   │   └── user.ts         # 用户状态
│   ├── services/           # API服务层
│   │   ├── api.ts          # API定义
│   │   └── index.ts        # 服务封装
│   ├── types/              # TypeScript类型定义
│   │   └── index.ts        # 类型定义
│   ├── utils/              # 工具函数
│   │   ├── request.ts      # 请求封装
│   │   └── index.ts        # 工具函数
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── index.html              # HTML模板
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript配置
├── vite.config.ts          # Vite配置
├── postcss.config.js       # PostCSS配置
└── .eslintrc.config.cjs           # ESLint配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

### 代码检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

## 技术栈

- **Vue 3**: 前端框架
- **TypeScript**: 类型系统
- **Vite**: 构建工具
- **Pinia**: 状态管理
- **Vue Router**: 路由管理
- **Element Plus**: UI组件库
- **Tailwind CSS**: CSS框架
- **Axios**: HTTP客户端
- **SCSS**: CSS预处理器

## 配置说明

### 环境变量

项目支持多环境配置，通过`.env`文件配置:

```
# 开发环境
VITE_APP_BASE_API=/api
VITE_APP_BASE_URL=http://localhost:8080

# 生产环境
VITE_APP_BASE_API=/api
VITE_APP_BASE_URL=https://api.example.com
```

### 路径别名

- `@` -> `src`
- `@components` -> `src/components`
- `@views` -> `src/views`
- `@router` -> `src/router`
- `@stores` -> `src/stores`
- `@services` -> `src/services`
- `@types` -> `src/types`
- `@utils` -> `src/utils`

## 开发规范

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 Vue 3 Composition API 规范
- 组件命名使用 PascalCase
- 变量和函数命名使用 camelCase
- 常量命名使用 UPPER_SNAKE_CASE

### Git提交规范

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

## API文档

API文档采用OpenAPI/Swagger格式，具体请参考后端API文档。

## 部署

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 部署到服务器

将 `dist` 目录部署到服务器，配置Nginx或其他Web服务器。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

MIT License

## 联系方式

如有问题，请联系项目维护者。