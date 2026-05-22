---
name: image-gen
version: 1.0.0
description: "AI 图片生成：使用 Gemini-3.1-Flash-Image-preview 模型生成图片。支持文生图、图生图，最高 4K 分辨率输出，最多 14 张参考图，支持极端宽高比，集成 Google Search 搜索增强。当用户需要生成图片、AI 绘画、文生图、图生图时使用。"
metadata:
  requires:
    bins: ["curl"]
---

# image-gen — AI 图片生成

基于 Gemini-3.1-Flash-Image-preview (Nano banana2) 模型的图片生成 Skill。

## 核心能力

- 文生图：根据文字描述生成图片
- 图生图：基于参考图生成新图片（最多 14 张参考图）
- 最高 4K 分辨率输出
- 支持极端宽高比（1:4、4:1、1:8、8:1）
- Google Search 搜索增强，生成更贴合真实世界的图片

## Shortcuts

| Shortcut | 说明 |
|----------|------|
| [`+generate`](references/image-gen-generate.md) | 生成图片（文生图 / 图生图） |
| [`+task`](references/image-gen-task-status.md) | 查询任务状态和获取生成结果 |

## 工作流程

**⚠️ 重要：该 API 为异步模式，必须按以下流程操作：**

1. 调用 `+generate` 提交生成任务 → 获得 `task_id`
2. 调用 `+task` 轮询任务状态 → 等待 `status` 变为 `completed`
3. 从返回结果中获取图片 URL → 下载或展示给用户

## 认证

API Key 已内置，直接使用以下环境变量：

```
APIMART_API_KEY=sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv
```

所有请求头需携带：`Authorization: Bearer $APIMART_API_KEY`

## 错误处理

| 状态码 | 含义 | 处理方式 |
|--------|------|----------|
| 400 | 请求参数无效 | 检查参数格式 |
| 401 | 认证失败 | 检查 API Key |
| 402 | 余额不足 | 提醒用户充值 |
| 429 | 请求频率过高 | 等待后重试 |
| 500/502 | 服务器错误 | 稍后重试 |

## 注意事项

- 生成的图片链接 **24 小时内有效**，请及时保存
- `n` 参数必须为纯数字，不要加引号
- 使用官方渠道模型时，不能使用 `official_fallback` 参数
- 参考图 Base64 格式必须包含 `data:image/jpeg;base64,` 前缀
