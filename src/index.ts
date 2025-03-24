import { Agent, ayaLogger } from '@tribesxyz/ayaos'

async function main(): Promise<void> {
  const agent = new Agent({
    dataDir: 'data'
  })

  await agent.start()

  ayaLogger.info('Agent started with ID:', agent.agentId)
}

main().catch(console.error)
