
# video-gen +task（查询任务状态）

> **前置条件：** 先阅读 [`../SKILL.md`](../SKILL.md) 了解认证和工作流程。

查询异步视频生成任务的执行状态和结果。

## 命令

```bash
curl --request GET \
  --url "https://api.apimart.ai/v1/tasks/<task_id>?language=zh" \
  --header "Authorization: Bearer sk-EwzWGTfDUftoq7YFLgTRuDGqCFkZFy3eBxO1vbLuKXrigjuv"
```

## 参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `task_id`（路径） | 是 | 生成任务返回的任务 ID |
| `language`（查询） | 否 | 响应语言：`zh` / `en` / `ko` / `ja`，默认 `en` |

## 响应

### 任务完成

```json
{
  "code": 200,
  "data": {
    "id": "task_01KMCGF6BQGN3X28H3KSR50X5T",
    "status": "completed",
    "progress": 100,
    "result": {
      "videos": [
        {
          "url": [
            "https://upload.apimart.ai/f/video/xxx-video.mp4"
          ],
          "expires_at": 1763174708
        }
      ]
    },
    "created": 1763088289,
    "completed": 1763088308,
    "estimated_time": 120,
    "actual_time": 95
  }
}
```

### 任务处理中

```json
{
  "code": 200,
  "data": {
    "id": "task_01KMCGF6BQGN3X28H3KSR50X5T",
    "status": "processing",
    "progress": 50,
    "estimated_time": 120
  }
}
```

### 任务失败

```json
{
  "code": 200,
  "data": {
    "id": "task_01KMCGF6BQGN3X28H3KSR50X5T",
    "status": "failed",
    "error": {
      "code": 500,
      "message": "Generation failed",
      "type": "server_error"
    }
  }
}
```

## 任务状态值

| 状态 | 含义 |
|------|------|
| `pending` | 排队中 |
| `processing` | 处理中 |
| `completed` | 已完成 |
| `failed` | 失败 |
| `cancelled` | 已取消 |

## 轮询策略（给 AI）

1. 提交生成任务后，等待 **10 秒** 首次查询
2. 如果状态为 `pending` 或 `processing`，每 **10-15 秒** 查询一次
3. 直到状态变为 `completed`（成功）或 `failed`（失败）
4. 最多轮询 **60 次**（约 10 分钟），超过后提示用户任务可能超时
5. `completed` 时从 `result.videos[].url[]` 获取视频链接
6. 如果提交时设置了 `return_last_frame: true`，结果中还会包含尾帧图片 URL
7. 视频链接 **24 小时有效**，提醒用户及时保存

## 下载视频

获取到视频 URL 后，可用 curl 下载：

```bash
curl -o output.mp4 "<video_url>"
```

## 参考

- [SKILL.md](../SKILL.md) — 认证和工作流程
- [+generate](video-gen-generate.md) — 提交生成任务
