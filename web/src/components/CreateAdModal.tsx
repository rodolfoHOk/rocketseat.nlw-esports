import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';
import {
  CaretDoubleDown,
  CaretDoubleUp,
  CaretDown,
  Check,
  GameController,
} from 'phosphor-react';
import axios from 'axios';

import { Input } from './Form/Input';
import { Ad, AdModel } from '../dto/adDto';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<Ad>({
    resolver: zodResolver(AdModel),
  });

  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3333/games')
      .then((response) => setGames(response.data));
  }, []);

  async function handleCreateAd(data: Ad) {
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: data.yearsPlaying,
        discord: data.discord,
        weekDays: data.weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: data.useVoiceChannel,
      });
      alert('Anúncio criado com sucesso');
    } catch (err) {
      console.log(err);
      alert('Erro ao tentar criar o anúncio');
    }
  }

  useEffect(() => {
    const newWeekDays = watch('weekDays');
    if (newWeekDays !== undefined) {
      setWeekDays(newWeekDays);
    }
  }, [watch('weekDays')]);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit(handleCreateAd)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <Controller
              name="game"
              control={control}
              render={({ field }) => (
                <Select.Root
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Select.Trigger
                    aria-label="game"
                    className="flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm"
                  >
                    <Select.Value placeholder="Selecione o game que deseja jogar" />
                    <Select.Icon>
                      <CaretDown size={16} weight="bold" />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="bg-zinc-800 py-3 px-4 rounded text-sm text-white shadow-md shadow-zinc-900">
                      <Select.ScrollUpButton className="flex items-center justify-center px-2 py-2 rounded hover:bg-violet-600">
                        <CaretDoubleUp size={16} weight="bold" />
                      </Select.ScrollUpButton>

                      <Select.Viewport>
                        <Select.Group>
                          <Select.Label className="px-2 py-2 text-zinc-500">
                            Selecione o game que deseja jogar
                          </Select.Label>

                          {games.map((game) => (
                            <Select.Item
                              key={game.id}
                              value={game.id}
                              className="flex items-center px-2 py-2 justify-between rounded hover:bg-violet-600"
                            >
                              <Select.ItemText>{game.title}</Select.ItemText>

                              <Select.ItemIndicator>
                                <Check
                                  size={16}
                                  weight="bold"
                                  className="text-violet-500"
                                />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Viewport>

                      <Select.ScrollDownButton>
                        <CaretDoubleDown size={16} weight="bold" />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              )}
            />
            <span className="text-red-500 text-xs">{errors.game?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              label="name"
              register={register}
              required={true}
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
            <span className="text-red-500 text-xs">{errors.name?.message}</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                label="yearsPlaying"
                register={register}
                required={true}
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
              <span className="text-red-500 text-xs">
                {errors.yearsPlaying?.message}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input
                label="discord"
                register={register}
                required={true}
                id="discord"
                type="text"
                placeholder="Usuário#0000"
              />
              <span className="text-red-500 text-xs">
                {errors.discord?.message}
              </span>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <Controller
                name="weekDays"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <ToggleGroup.Root
                    {...field}
                    type="multiple"
                    className="grid grid-cols-4 gap-2"
                    // @ts-ignore
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ToggleGroup.Item
                      value="0"
                      title="Domingo"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      D
                    </ToggleGroup.Item>

                    <ToggleGroup.Item
                      value="1"
                      title="Segunda"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      S
                    </ToggleGroup.Item>

                    <ToggleGroup.Item
                      value="2"
                      title="Terça"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      T
                    </ToggleGroup.Item>

                    <ToggleGroup.Item
                      value="3"
                      title="Quarta"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      Q
                    </ToggleGroup.Item>

                    <ToggleGroup.Item
                      value="4"
                      title="Quinta"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      Q
                    </ToggleGroup.Item>

                    <ToggleGroup.Item
                      value="5"
                      title="Sexta"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      S
                    </ToggleGroup.Item>

                    <ToggleGroup.Item
                      value="6"
                      title="Sábado"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                )}
              />

              <span className="text-red-500 text-xs">
                {errors.weekDays?.message}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <Input
                    label="hourStart"
                    register={register}
                    required={true}
                    id="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <span className="text-red-500 text-xs">
                    {errors.hourStart?.message}
                  </span>
                </div>

                <div>
                  <Input
                    label="hourEnd"
                    register={register}
                    required={true}
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                  <span className="text-red-500 text-xs">
                    {errors.hourEnd?.message}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 mt-2 text-small">
            <Controller
              name="useVoiceChannel"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                // @ts-ignore
                <Checkbox.Root
                  {...field}
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )}
            />
            Costumo me conectar ao chat de voz
          </label>
          <span className="text-red-500 text-xs">
            {errors.useVoiceChannel?.message}
          </span>

          <footer className="flex justify-end gap-4 mt-4">
            <Dialog.Close
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              type="button"
            >
              Cancelar
            </Dialog.Close>

            <button
              className="flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
