import { getPayload as getPayloadInstance } from 'payload'
import config from '@root/payload.config'

export const getPayload = () => getPayloadInstance({ config })
