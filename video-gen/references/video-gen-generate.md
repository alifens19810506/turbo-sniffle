
# video-gen +generate（生成视频）

> **前置条件：** 先阅读 [`../SKILL.md`](../SKILL.md) 了解认证和工作流程。

提交视频生成任务（文生视频 / 图生视频 / 参考视频等），返回 `task_id` 用于后续查询。

## 命令

### 文生视频

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "resolution": "720p",
    "size": "16:9",
    "duration": 5
  }'
```

### 图生视频（首帧）

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "image_urls": ["<参考图URL>"],
    "duration": 5
  }'
```

### 首尾帧视频

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "image_with_roles": [
      {"url": "<首帧图URL>", "role": "first_frame"},
      {"url": "<尾帧图URL>", "role": "last_frame"}
    ],
    "duration": 5
  }'
```

### 参考视频生视频

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "video_urls": ["<参考视频URL>"]
  }'
```

### 有声视频

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "generate_audio": true,
    "duration": 5
  }'
```

### 参考视频 + 参考音频

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "video_urls": ["<参考视频URL>"],
    "audio_urls": ["<参考音频URL>"],
    "size": "16:9",
    "duration": 11
  }'
```

### 连续视频生成（返回尾帧）

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "image_urls": ["<上一段视频尾帧URL>"],
    "return_last_frame": true,
    "duration": 5
  }'
```

### 快速版生成

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0-fast",
    "prompt": "<视频内容描述>",
    "size": "21:9",
    "duration": 8
  }'
```

### 联网搜索增强

```bash
curl --request POST \
  --url https://api.apimart.ai/v1/videos/generations \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "doubao-seedance-2.0",
    "prompt": "<视频内容描述>",
    "size": "16:9",
    "duration": 5,
    "tools": [{"type": "web_search"}]
  }'
```

## 参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `model` | 是 | 模型名称：`doubao-seedance-2.0`（标准版）、`doubao-seedance-2.0-fast`（快速版）、`doubao-seedance-2.0-face`（真人版）、`doubao-seedance-2.0-fast-face`（快速真人版） |
| `prompt` | 文生视频时必填 | 视频内容描述，建议明确主体、动作、镜头和风格；限制 4000 字符，建议 500 字符 |
| `duration` | 否 | 视频时长（秒）：4-15，默认 5 |
| `size` | 否 | 宽高比，见下方支持列表，默认 `16:9` |
| `resolution` | 否 | 分辨率：`480p`（默认）/ `720p` / `1080p`（仅标准版和真人版支持） |
| `seed` | 否 | 随机种子，相同 seed 生成类似结果 |
| `generate_audio` | 否 | 是否生成 AI 配套音频，默认 `false` |
| `return_last_frame` | 否 | 是否返回尾帧图片（用于连续视频生成），默认 `false` |
| `image_urls` | 否 | 参考图 URL 数组，最多 9 张；支持普通 URL 和 Asset URL |
| `image_with_roles` | 否 | 带角色的图片数组，支持 `first_frame`（首帧）、`last_frame`（尾帧）、`reference_image`（参考人像） |
| `video_urls` | 否 | 参考视频 URL 数组，最多 3 个，总时长 ≤ 15s，分辨率 480P-720P；支持 Asset URL |
| `audio_urls` | 否 | 参考音频 URL 数组，最多 3 个，总时长 ≤ 15s，需与参考图片/视频配合；支持 Asset URL |
| `tools` | 否 | 工具列表，如 `[{"type": "web_search"}]` 启用联网搜索 |

### 支持的宽高比

| 比例 | 适用场景 |
|------|----------|
| `16:9` | 横屏视频 |
| `9:16` | 竖屏视频（短视频） |
| `1:1` | 方形视频（社交媒体） |
| `4:3` | 传统比例 |
| `3:4` | 竖向传统比例 |
| `21:9` | 超宽屏 |
| `adaptive` | 自适应（根据输入图片/视频自动匹配） |

### 参考素材格式

支持两种格式：

1. **普通 URL**：公开可访问的资源 URL（`https://example.com/image.jpg`）
2. **Asset URL**：审核通过的素材（`asset://asset_a`），仅 `doubao-seedance-2.0` 和 `doubao-seedance-2.0-fast` 支持

### 互斥约束

- `image_urls` 和 `image_with_roles` 不能同时使用
- 使用首尾帧图片（`image_with_roles`）时，`video_urls` 和 `audio_urls` 不可用
- 参考视频不可出现真人（真人场景需使用 face 模型 + Asset URL）
- 参考音频需与参考图片或参考视频配合使用

## 响应

成功时返回：

```json
{
  "code": 200,
  "data": [
    {
      "status": "submitted",
      "task_id": "task_01KMCGF6BQGN3X28H3KSR50X5T"
    }
  ]
}
```

获取 `task_id` 后，使用 [`+task`](video-gen-task-status.md) 查询任务状态和获取生成结果。

## 常见用法（给 AI）

- 提交任务后等待 10 秒首次调用 `+task` 查询状态
- 如果 `status` 为 `pending` 或 `processing`，每 10-15 秒查询一次
- 重复查询直到 `status` 变为 `completed` 或 `failed`
- `completed` 时从 `result.videos[].url[]` 获取视频链接
- 视频链接 24 小时有效，建议及时下载保存
- 视频生成耗时较长（通常 30 秒到数分钟），需耐心轮询

## 参考

- [SKILL.md](../SKILL.md) — 认证和工作流程
- [+task](video-gen-task-status.md) — 查询任务状态
