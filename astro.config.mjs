// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeLangBlocks } from './src/plugins/rehype-lang-blocks.mjs';

export default defineConfig({
  site: 'https://theob63.github.io',
  base: '/BlanchardTheo',
})