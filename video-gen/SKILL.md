---
name: video-gen
version: 1.0.0
description: "AI 视频生成：使用 doubao-seedance-2.0 模型生成视频。支持文生视频、图生视频（首帧/尾帧）、参考视频、参考音频、有声视频，最高 1080p 分辨率，5-15 秒时长，支持横屏/竖屏/方形/超宽屏/自适应多种比例。当用户需要生成视频、AI 视频创作、文生视频、图生视频时使用。"
metadata:
  requires:
    bins: ["curl"]
---

# video-gen — AI 视频生成

基于 doubao-seedance-2.0 模型的视频生成 Skill。

## 核心能力

- 文生视频：根据文字描述生成视频
- 图生视频：基于参考图生成视频（最多 9 张参考图）
- 首尾帧视频：指定首帧和尾帧图片生成过渡视频
- 参考视频：基于参考视频风格迁移或动作迁移
- 参考音频：配合参考图片/视频生成有声视频
- 有声视频：AI 自动生成配套音频
- 连续视频：返回尾帧用于连续生成
- 最高 1080p 分辨率，5-15 秒时长
- 支持多种宽高比（16:9、9:16、1:1、4:3、3:4、21:9、adaptive）
- 联网搜索增强

## Shortcuts

| Shortcut | 说明 |
|----------|------|
| [`+generate`](references/video-gen-generate.md) | 生成视频（文生视频 / 图生视频 / 参考视频等） |
| [`+task`](references/video-gen-task-status.md) | 查询任务状态和获取生成结果 |

## 工作流程

**⚠️ 重要：该 API 为异步模式，必须按以下流程操作：**

1. 调用 `+generate` 提交生成任务 → 获得 `task_id`
2. 调用 `+task` 轮询任务状态 → 等待 `status` 变为 `completed`
3. 从返回结果中获取视频 URL → 下载或展示给用户

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

- 生成的视频链接 **24 小时内有效**，请及时保存
- `duration` 参数必须为纯数字，不要加引号
- `image_urls` 和 `image_with_roles` 不能同时使用
- 使用首尾帧图片时，`video_urls` 和 `audio_urls` 不可用
- 参考视频最多 3 个，总时长 ≤ 15s，分辨率需在 480P-720P 之间
- 参考音频最多 3 个，总时长 ≤ 15s，需与参考图片或参考视频配合使用
- Asset URL 仅支持 `doubao-seedance-2.0` 和 `doubao-seedance-2.0-fast` 模型
- 视频生成耗时较长，建议轮询间隔 10-15 秒
