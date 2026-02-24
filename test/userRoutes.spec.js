import { describe, it, expect, vi } from 'vitest';

describe('User routes', () => {
  it('GET /health returns server running', async () => {
    vi.resetModules();
    const { handleUserRoutes } = await import('../src/routes/userRoutes.js');
    const req = new Request('https://example.com/health', { method: 'GET' });
    const res = await handleUserRoutes(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ message: 'Server is running' });
  });

  it('GET /users returns initial users', async () => {
    vi.resetModules();
    const { handleUserRoutes } = await import('../src/routes/userRoutes.js');
    const req = new Request('https://example.com/users', { method: 'GET' });
    const res = await handleUserRoutes(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toEqual([{ id: 1, name: 'Tony', email: 'tony@gmail.com' }]);
  });

  it('GET /users/:id returns user', async () => {
    vi.resetModules();
    const { handleUserRoutes } = await import('../src/routes/userRoutes.js');
    const req = new Request('https://example.com/users/1', { method: 'GET' });
    const res = await handleUserRoutes(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ id: 1, name: 'Tony', email: 'tony@gmail.com' });
  });

  it('POST /users creates a user', async () => {
    vi.resetModules();
    const { handleUserRoutes } = await import('../src/routes/userRoutes.js');
    const payload = { name: 'Bruce', email: 'bruce@example.com' };
    const req = new Request('https://example.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const res = await handleUserRoutes(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ id: 2, ...payload });

    // confirm GET /users includes new user
    const res2 = await handleUserRoutes(new Request('https://example.com/users', { method: 'GET' }));
    const all = await res2.json();
    expect(all.length).toBe(2);
    expect(all[1]).toEqual(body);
  });

  it('DELETE /users/:id removes a user', async () => {
    vi.resetModules();
    const { handleUserRoutes } = await import('../src/routes/userRoutes.js');
    // create a user first
    const payload = { name: 'Bruce', email: 'bruce@example.com' };
    await handleUserRoutes(new Request('https://example.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }));
    const delRes = await handleUserRoutes(new Request('https://example.com/users/2', { method: 'DELETE' }));
    expect(delRes.status).toBe(200);
    const deleted = await delRes.json();
    expect(deleted).toEqual({ id: 2, ...payload });

    const res = await handleUserRoutes(new Request('https://example.com/users', { method: 'GET' }));
    const all = await res.json();
    expect(all).toEqual([{ id: 1, name: 'Tony', email: 'tony@gmail.com' }]);
  });
});
