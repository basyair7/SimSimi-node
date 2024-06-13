import * as path from "path"
import * as fs from 'fs'
import { CommandHandler } from "../handles/CommandHandler"
import TelegramBot from "node-telegram-bot-api"

interface commandInfo {
    id: number;
    name: string;
    description: string;
}

export default class HelpCommand implements CommandHandler {
    readonly id = 1;
    readonly name = 'help';
    readonly description = 'Get help';

    async execute(bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null): Promise<void> {
        const chatId = msg.chat.id;
        const commandDir = path.join(__dirname, "../commands");
        const commands: commandInfo[] = [];
        let helpMessage: string = "Here are some commands you can use:\n";

        try {
            const files = await fs.promises.readdir(commandDir);
            // console.log('Command files found:', files);

            // Filter hanya file yang merupakan modul command
            const commandFiles = files.filter(file => file.endsWith('.ts'));
            // console.log('Filtered command files:', commandFiles);

            for (const file of commandFiles) {
                // console.log('Importing command file:', file);
                const commandModule = await import(path.join(commandDir, file));
                const CommandClass = commandModule.default;
                
                // Pastikan CommandClass adalah constructor yang valid
                if (CommandClass && typeof CommandClass === 'function') {
                    const commandInstance: CommandHandler = new CommandClass();
                    if ('name' in commandInstance && 'description' in commandInstance) {
                        commands.push({
                            id: commandInstance.id,
                            name: commandInstance.name,
                            description: commandInstance.description
                        });

                    } else {
                        console.error('Invalid command class:', commandInstance);
                    }
                    
                } else {
                    console.error('Invalid command module:', CommandClass);
                }
            }

            commands.sort((a, b) => a.id - b.id);
            commands.forEach(command => {
                helpMessage += `/${command.name} - ${command.description}\n`;
            });

        } catch (error) {
            console.error(error);
            helpMessage += "An error occurred while generating the help list.";
        }

        bot.sendMessage(chatId, helpMessage);
    }
}