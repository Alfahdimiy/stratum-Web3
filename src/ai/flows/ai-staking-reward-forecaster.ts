'use server';
/**
 * @fileOverview An AI agent that analyzes staked assets and historical contract performance
 *               to provide a personalized, predictive summary of future reward yields.
 *
 * - aiStakingRewardForecaster - A function that handles the prediction process for staking rewards.
 * - AiStakingRewardForecasterInput - The input type for the aiStakingRewardForecaster function.
 * - AiStakingRewardForecasterOutput - The return type for the aiStakingRewardForecaster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiStakingRewardForecasterInputSchema = z.object({
  stakedAmount: z
    .string()
    .describe(
      'The amount of tokens currently staked by the user, as a string to handle large numbers.'
    ),
  tokenSymbol: z
    .string()
    .describe('The symbol of the token being staked (e.g., "ETH", "USDC").'),
  stakingDurationDays: z
    .number()
    .int()
    .positive()
    .describe('The intended duration of the staking lock in days (e.g., 30, 90, 180).'),
  historicalApyDescription: z
    .string()
    .describe('A summary or average of the historical Annual Percentage Yield (APY) for this staking contract. E.g., "Average APY over the last 6 months was 12% with peaks up to 15% during high network activity."'),
  contractTVLDescription: z
    .string()
    .describe('A summary of the Total Value Locked (TVL) in the staking contract. E.g., "The contract currently holds $50M TVL, showing a 20% growth in the last quarter."'),
  pastRewardDistributionSummary: z
    .string()
    .describe('A summary of how rewards have been distributed in the past for this contract, including frequency and general amounts. E.g., "Rewards are distributed daily, with an average of 0.05% of TVL distributed per day."'),
});
export type AiStakingRewardForecasterInput = z.infer<
  typeof AiStakingRewardForecasterInputSchema
>;

const AiStakingRewardForecasterOutputSchema = z.object({
  predictiveSummary: z
    .string()
    .describe(
      'A personalized, predictive summary of the user\u0027s future reward yields based on their staked assets and historical contract performance.'
    ),
  predictedYieldPercentage: z
    .number()
    .describe(
      'The predicted annual percentage yield (APY) for the user\u0027s staked assets.'
    ),
  predictedTotalRewards: z
    .string()
    .describe(
      'The estimated total rewards in token symbols (e.g., 50.12 ETH) for the specified staking duration.'
    ),
  recommendations: z
    .string()
    .describe(
      'Actionable recommendations or insights for the user to optimize their staking decisions.'
    ),
});
export type AiStakingRewardForecasterOutput = z.infer<
  typeof AiStakingRewardForecasterOutputSchema
>;

export async function aiStakingRewardForecaster(
  input: AiStakingRewardForecasterInput
): Promise<AiStakingRewardForecasterOutput> {
  return aiStakingRewardForecasterFlow(input);
}

const aiStakingRewardForecasterPrompt = ai.definePrompt({
  name: 'aiStakingRewardForecasterPrompt',
  input: {schema: AiStakingRewardForecasterInputSchema},
  output: {schema: AiStakingRewardForecasterOutputSchema},
  prompt: `You are an expert financial analyst specializing in Web3 staking rewards.
Your goal is to provide a comprehensive and personalized predictive summary of a user's future staking reward yields.
Analyze the provided user's staked assets and the historical performance of the staking contract to offer insights and recommendations.

User Staked Assets:
- Amount Staked: {{{stakedAmount}}} {{{tokenSymbol}}}
- Intended Staking Duration: {{{stakingDurationDays}}} days

Staking Contract Performance:
- Historical APY Description: {{{historicalApyDescription}}}
- Contract Total Value Locked (TVL) Description: {{{contractTVLDescription}}}
- Past Reward Distribution Summary: {{{pastRewardDistributionSummary}}}

Based on this information, generate a predictive summary, including a predicted yield percentage (APY) and an estimated total reward amount in the token symbol for the specified duration. Also, provide clear, actionable recommendations for the user to make informed staking decisions. Ensure the tone is professional and insightful.`,
});

const aiStakingRewardForecasterFlow = ai.defineFlow(
  {
    name: 'aiStakingRewardForecasterFlow',
    inputSchema: AiStakingRewardForecasterInputSchema,
    outputSchema: AiStakingRewardForecasterOutputSchema,
  },
  async input => {
    const {output} = await aiStakingRewardForecasterPrompt(input);
    if (!output) {
      throw new Error('Failed to generate staking reward forecast.');
    }
    return output;
  }
);
