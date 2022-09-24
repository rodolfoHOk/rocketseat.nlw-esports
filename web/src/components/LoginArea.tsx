import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DiscordLogo, SignOut, User } from 'phosphor-react';
import { useAuth } from '../contexts/AuthContext';
export function LoginArea() {
  const { user, logout, loginUrl } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="text-violet-500 outline-none">
        {user ? (
          <img
            className="w-12 h-12 border-2 border-violet-500 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200"
            src={user.avatarUrl}
            alt="user avatar image"
          />
        ) : (
          <User
            weight="thin"
            size={24}
            className="w-12 h-12 bg-[#2A2634] border-2 border-violet-500 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200"
          />
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-52 mr-2 flex flex-col bg-[#2A2634]/80 text-zinc-400 rounded-md border-[1px] border-violet-500 overflow-hidden ">
          {user && (
            <>
              <DropdownMenu.Label className="px-4 py-4">
                <span>Logado como:</span>
                <p className="font-semibold">{user?.username}</p>
              </DropdownMenu.Label>

              <DropdownMenu.Separator className="h-[1px] bg-violet-500 hover:bg-violet-500" />
            </>
          )}

          {user ? (
            <DropdownMenu.Item
              className="mx-2 my-2 flex items-center justify-between h-9 px-2 outline-none rounded hover:bg-violet-600 hover:text-white transition-colors duration-200"
              onClick={logout}
            >
              Deslogar
              <SignOut size={20} />
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item className="mx-2 my-2 flex items-center justify-between h-9 px-2 outline-none rounded hover:bg-violet-600 hover:text-white transition-colors duration-200">
              <a
                href={loginUrl}
                className="w-full flex items-center justify-between"
              >
                Logar com Discord
                <DiscordLogo size={20} />
              </a>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Arrow className="fill-violet-500" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
