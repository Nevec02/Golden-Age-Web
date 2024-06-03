import { NextResponse } from 'next/server';
import { updateRole, deleteUser } from '@/libs/data';

export async function PUT(req, { params }) {
  const { id } = params;
  let role;

  try {
    const body = await req.json();
    role = body.role;
  } catch (error) {
    console.error('Failed to parse request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof role !== 'number') {
    return NextResponse.json({ error: 'Role must be a number' }, { status: 400 });
  }

  try {
    await updateRole(id, role);
    return NextResponse.json({ message: 'Role updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await deleteUser(id);
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.message.includes('Cannot delete user with existing orders')) {
      return NextResponse.json({ error: 'Cannot delete user with existing orders' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
