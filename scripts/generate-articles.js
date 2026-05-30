import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/content/blog');
await fs.mkdir(contentDir, { recursive: true });

const topicsJson = await fs.readFile(path.join(__dirname, '../data/topics.json'), 'utf8');
const topics = JSON.parse(topicsJson);

const sanitizeSlug = (value) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
		.slice(0, 100);

const getDate = (index) => {
	const start = new Date('2025-06-01T08:00:00Z');
	const date = new Date(start.valueOf() + index * 24 * 60 * 60 * 1000);
	return date.toISOString().slice(0, 10);
};

const tagMap = {
	'ChatGPT Prompts': ['chatgpt', 'prompt-engineering'],
	'Marketing Prompts': ['marketing', 'copywriting'],
	'SEO Prompts': ['seo', 'content'],
	'Business Prompts': ['business', 'strategy'],
	'Coding Prompts': ['coding', 'developer'],
	'YouTube Prompts': ['youtube', 'video'],
	'Social Media Prompts': ['social-media', 'engagement'],
	'Productivity Prompts': ['productivity', 'workflow'],
};

for (const [index, topic] of topics.entries()) {
	const slug = `${sanitizeSlug(topic.title)}-${index + 1}`;
	const filename = path.join(contentDir, `${slug}.md`);
	const publishDate = getDate(index);
	const tags = tagMap[topic.category] || ['ai', 'prompt'];
	const description = `${topic.title} — use this guide to generate polished results quickly and consistently.`;
	const promptExample = `Write a ${topic.category.toLowerCase()} prompt for the following objective:\n\n${topic.title}\n\nUse a clear structure, examples, and output guidelines.`;
	const content = `---
title: "${topic.title}"
description: "${description}"
pubDate: "${publishDate}"
category: "${topic.category}"
tags:
${tags.map((tag) => `  - "${tag}"`).join('\n')}
---

## Why this prompt works

This article helps you use a structured prompt to generate consistent, high-value responses from your AI assistant. The example uses a clear task, context, and expected output format to improve reliability.

## Sample prompt

\`\`
${promptExample}
\`\`

## How to use it

1. Replace the objective with your specific goal.
2. Provide any required context, such as tone, audience, or format.
3. Ask the model to return results in a concise structure or checklist.

## Customize for your workflow

Change the prompt to include your product, audience, or campaign details. Use the same pattern across marketing, social, SEO, and productivity tasks to maintain consistent output quality.
`;

	await fs.writeFile(filename, content, 'utf8');
}

console.log(`Generated ${topics.length} articles in ${contentDir}`);
