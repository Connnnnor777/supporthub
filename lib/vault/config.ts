export const vaultConfig = {
  path: process.env.VAULT_PATH ?? "C:/CUSTOM/vault",

  ignore: [
    ".git",
    ".github",
    ".next",
    ".obsidian",
    "node_modules",
    "supporthub",
  ],
}