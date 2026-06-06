
# image-gen +generate（生成图片）

> **前置条件：** 先阅读 [`../SKILL.md`](../SKILL.md) 了解认证和工作流程。

提交图片生成任务（文生图 / 图生图），返回 `task_id` 用于后续查询。

## 命令

### 文生图

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/images/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "gemini-3.1-flash-image-preview",
    "prompt": "<图片描述>",
    "size": "<宽高比>",
    "resolution": "<分辨率>",
    "n": <数量>
  }'
```

### 图生图（带参考图）

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/images/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "gemini-3.1-flash-image-preview",
    "prompt": "<图片描述>",
    "size": "<宽高比>",
    "resolution": "<分辨率>",
    "n": <数量>,
    "image_urls": ["<参考图URL1>", "<参考图URL2>"]
  }'
```

### 启用 Google Search 增强

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/images/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "gemini-3.1-flash-image-preview",
    "prompt": "<图片描述>",
    "size": "<宽高比>",
    "resolution": "<分辨率>",
    "n": <数量>,
    "google_search": true,
    "google_image_search": true
  }'
```

## 参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `model` | 是 | 模型名称：`gemini-3.1-flash-image-preview`（标准版）或 `gemini-3.1-flash-image-preview-official`（官方版） |
| `prompt` | 是 | 图片生成的文本描述 |
| `size` | 否 | 宽高比，见下方支持列表 |
| `resolution` | 否 | 分辨率：`0.5K` / `1K`（默认）/ `2K` / `4K` |
| `n` | 否 | 生成数量：1-4，默认 1（⚠️ 必须为纯数字，不加引号） |
| `image_urls` | 否 | 参考图 URL 列表，最多 14 张 |
| `official_fallback` | 否 | 是否使用官方渠道兜底，默认 `false`（⚠️ 官方版模型不能使用此参数） |
| `google_search` | 否 | 启用 Google 文字搜索增强，默认 `false` |
| `google_image_search` | 否 | 启用 Google 图片搜索增强（需配合 `google_search: true`），默认 `false` |

### 支持的宽高比

| 比例 | 适用场景 |
|------|----------|
| `1:1` | 方形图、头像、社交媒体 |
| `3:2` / `2:3` | 标准照片 |
| `4:3` / `3:4` | 传统显示器比例 |
| `16:9` / `9:16` | 宽屏/竖屏视频封面 |
| `5:4` / `4:5` | Instagram 图片 |
| `21:9` | 超宽屏 Banner |
| `1:4` / `4:1` | 长条海报/横幅 |
| `1:8` / `8:1` | 极端长图/横幅广告 |

### 参考图格式

支持两种格式：

1. **完整 URL**：公开可访问的图像 URL（`https://example.com/image.jpg`）
2. **Base64 Data URI**：`data:image/jpeg;base64,/9j/4AAQ...`（必须包含前缀）

限制：最多 14 张，单张不超过 10MB，支持 jpeg/png/webp。

## 响应

成功时返回：

```json
{
  "code": 200,
  "data": [
    {
      "status": "submitted",
      "task_id": "task_01K8SGYNNNVBQTXNR4MM964S7K"
    }
  ]
}
```

获取 `task_id` 后，使用 [`+task`](image-gen-task-status.md) 查询任务状态和获取生成结果。

## 常见用法（给 AI）

- 提交任务后立即调用 `+task` 查询状态，如果 `status` 为 `pending` 或 `processing`，等待 5-10 秒后再次查询
- 重复查询直到 `status` 变为 `completed` 或 `failed`
- `completed` 时从 `result.images[].url[]` 获取图片链接
- 图片链接 24 小时有效，建议及时下载保存

## 参考

- [SKILL.md](../SKILL.md) — 认证和工作流程
- [+task](image-gen-task-status.md) — 查询任务状态
