/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface ResumeRequest {
  id: string;
  name: string;
  company: string;
  designation: string;
  email: string;
  purpose: string;
  date: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  date: string;
}
